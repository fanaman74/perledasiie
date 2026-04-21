import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { email, code, customerName, customerPhone, items, total, locale } = await req.json();

    if (!email || !code || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Verify OTP
    const { data: otps } = await supabase
      .from('otps')
      .select('id, code, expires_at, used')
      .eq('email', email)
      .eq('used', false)
      .order('created_at', { ascending: false })
      .limit(1);

    const otp = otps?.[0];

    if (!otp) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }

    if (otp.code !== code) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }

    if (new Date(otp.expires_at) < new Date()) {
      return NextResponse.json({ error: 'expired' }, { status: 400 });
    }

    // Mark OTP as used
    await supabase.from('otps').update({ used: true }).eq('id', otp.id);

    // Save order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_email: email,
        customer_phone: customerPhone || null,
        items,
        total,
        locale: locale || 'fr',
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send confirmation emails (non-blocking)
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const restaurantEmail = process.env.RESTAURANT_EMAIL;
    if (!restaurantEmail) throw new Error('RESTAURANT_EMAIL env var is required');

    if (resendKey) {
      const resend = new Resend(resendKey);
      const firstName = customerName?.split(' ')[0] || customerName;

      const itemRows = items
        .map((i: any) => `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0ece6">${i.quantity}×</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0ece6">${i.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0ece6;text-align:right">${(i.price * i.quantity).toFixed(2)}€</td>
        </tr>`)
        .join('');

      const orderHtml = (forRestaurant: boolean) => `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1814">
          <div style="background:#3d7022;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:2px">PERLE D'ASIE</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px">
              ${forRestaurant ? 'Nouvelle commande traiteur' : 'Confirmation de commande'}
            </p>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e8e2da">
            ${forRestaurant
              ? `<p style="margin:0 0 16px"><strong>${customerName}</strong> — <a href="mailto:${email}" style="color:#3d7022">${email}</a>${customerPhone ? ` — ${customerPhone}` : ''}</p>`
              : `<p style="margin:0 0 16px">Bonjour ${firstName},<br>Merci pour votre commande !</p>`
            }
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 16px">
              <thead>
                <tr style="background:#f0ece6">
                  <th style="padding:8px 12px;text-align:left;font-weight:600">Qté</th>
                  <th style="padding:8px 12px;text-align:left;font-weight:600">Article</th>
                  <th style="padding:8px 12px;text-align:right;font-weight:600">Prix</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:12px;font-weight:700;font-size:15px">Total</td>
                  <td style="padding:12px;font-weight:700;font-size:15px;text-align:right;color:#3d7022">${Number(total).toFixed(2)}€</td>
                </tr>
              </tfoot>
            </table>
            ${!forRestaurant ? `
              <div style="border-left:3px solid #3d7022;padding:12px 16px;background:#f8fdf5;font-size:13px;color:#6b6358">
                <strong style="color:#1a1814">Restaurant Perle d'Asie</strong><br>
                Avenue de l'Exposition 266, 1090 Laeken<br>
                Tél : <a href="tel:+3223664740" style="color:#3d7022">02 366 47 40</a>
              </div>` : ''}
          </div>
          <div style="padding:16px 32px;background:#f0ece6;font-size:12px;color:#9a9080;text-align:center">
            Restaurant Perle d'Asie — Laeken, Bruxelles
          </div>
        </div>`;

      await Promise.all([
        resend.emails.send({
          from: `Perle d'Asie <${fromEmail}>`,
          to: [restaurantEmail],
          subject: `🛒 Commande traiteur — ${customerName} (${Number(total).toFixed(2)}€)`,
          html: orderHtml(true),
          replyTo: email,
        }),
        resend.emails.send({
          from: `Restaurant Perle d'Asie <${fromEmail}>`,
          to: [email],
          subject: `Votre commande chez Perle d'Asie — confirmation`,
          html: orderHtml(false),
        }),
      ]).catch(err => console.error('Email send error:', err));
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
