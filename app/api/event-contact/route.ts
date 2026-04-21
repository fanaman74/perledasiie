import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const EVENT_TYPE_LABELS: Record<string, string> = {
  birthday: 'Anniversaire',
  corporate: "Repas d'entreprise",
  wedding: 'Mariage / Fiançailles',
  family: 'Repas de famille',
  catering: 'Traiteur à domicile',
  other: 'Autre',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, event_type, event_date, guests, message, code } = body;

    if (!first_name || !last_name || !email || !event_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Verify OTP
    if (!code) {
      return NextResponse.json({ error: 'OTP code required' }, { status: 400 });
    }

    const { data: otps } = await supabase
      .from('otps')
      .select('id, code, expires_at, used')
      .eq('email', email)
      .eq('used', false)
      .order('created_at', { ascending: false })
      .limit(1);

    const otp = otps?.[0];
    if (!otp || otp.code !== code) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    if (new Date(otp.expires_at) < new Date()) {
      return NextResponse.json({ error: 'expired' }, { status: 400 });
    }

    await supabase.from('otps').update({ used: true }).eq('id', otp.id);

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('event_requests').insert({
      first_name,
      last_name,
      email,
      phone: phone || null,
      event_type,
      event_date: event_date || null,
      guests: guests ? parseInt(guests, 10) : null,
      message: message || null,
      status: 'pending',
    });

    if (dbError) {
      console.error('Event request insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 2. Send emails via Resend (gracefully skip if key not set)
    const resendKey = process.env.RESEND_API_KEY;
    const restaurantEmail = process.env.RESTAURANT_EMAIL;
    if (!restaurantEmail) throw new Error('RESTAURANT_EMAIL env var is required');
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (resendKey) {
      const resend = new Resend(resendKey);
      const typeLabel = EVENT_TYPE_LABELS[event_type] || event_type;
      const dateLabel = event_date ? new Date(event_date).toLocaleDateString('fr-BE') : '—';

      // Email to restaurant
      const restaurantHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1814">
          <div style="background:#3d7022;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:2px">PERLE D'ASIE</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px">Nouvelle demande d'événement</p>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e8e2da">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358;width:40%">Nom</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6;font-weight:600">${first_name} ${last_name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6"><a href="mailto:${email}" style="color:#3d7022">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358">Téléphone</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6"><a href="tel:${phone}" style="color:#3d7022">${phone}</a></td></tr>` : ''}
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358">Type</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6">${typeLabel}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358">Date souhaitée</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6">${dateLabel}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#6b6358">Personnes</td><td style="padding:10px 0;border-bottom:1px solid #f0ece6">${guests || '—'}</td></tr>
              ${message ? `<tr><td style="padding:10px 0;color:#6b6358;vertical-align:top">Message</td><td style="padding:10px 0;white-space:pre-wrap">${message}</td></tr>` : ''}
            </table>
          </div>
          <div style="padding:16px 32px;background:#f0ece6;font-size:12px;color:#9a9080;text-align:center">
            Restaurant Perle d'Asie — Jette, Bruxelles
          </div>
        </div>`;

      // Confirmation email to customer
      const customerHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1814">
          <div style="background:#3d7022;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:2px">PERLE D'ASIE</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px">Restaurant — Jette, Bruxelles</p>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e8e2da">
            <h2 style="margin:0 0 16px;font-size:18px">Bonjour ${first_name},</h2>
            <p style="color:#6b6358;line-height:1.7;margin:0 0 16px">
              Nous avons bien reçu votre demande pour un <strong>${typeLabel}</strong>${event_date ? ` le <strong>${dateLabel}</strong>` : ''}${guests ? ` pour <strong>${guests} personnes</strong>` : ''}.
            </p>
            <p style="color:#6b6358;line-height:1.7;margin:0 0 24px">
              Notre équipe vous contactera dans les plus brefs délais pour confirmer les détails de votre événement.
            </p>
            <div style="border-left:3px solid #3d7022;padding:12px 16px;background:#f8fdf5;font-size:13px;color:#6b6358">
              <strong style="color:#1a1814">Restaurant Perle d'Asie</strong><br>
              Avenue de l'Exposition 266, 1090 Jette<br>
              Tél: <a href="tel:+3223664740" style="color:#3d7022">02 366 47 40</a><br>
              <a href="mailto:${restaurantEmail}" style="color:#3d7022">${restaurantEmail}</a>
            </div>
          </div>
          <div style="padding:16px 32px;background:#f0ece6;font-size:12px;color:#9a9080;text-align:center">
            Vous recevez cet email car vous avez soumis une demande via notre site web.
          </div>
        </div>`;

      await Promise.all([
        resend.emails.send({
          from: `Perle d'Asie <${fromEmail}>`,
          to: [restaurantEmail],
          subject: `📅 Nouvelle demande — ${typeLabel} (${first_name} ${last_name})`,
          html: restaurantHtml,
          replyTo: email,
        }),
        resend.emails.send({
          from: `Restaurant Perle d'Asie <${fromEmail}>`,
          to: [email],
          subject: `Votre demande d'événement chez Perle d'Asie — confirmation`,
          html: customerHtml,
        }),
      ]);

      console.log('Emails sent via Resend');
    } else {
      console.log('RESEND_API_KEY not set — skipping email');
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Event contact error:', e);
    // Still return success if DB write worked but email failed
    return NextResponse.json({ success: true, emailError: e.message });
  }
}
