import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Invalidate any previous unused OTPs for this email
    const supabase = createServerClient();
    await supabase.from('otps').update({ used: true }).eq('email', email).eq('used', false);

    // Store new OTP
    const { error: dbError } = await supabase.from('otps').insert({
      email,
      code,
      expires_at: expiresAt.toISOString(),
    });
    if (dbError) return NextResponse.json({ error: 'Database error' }, { status: 500 });

    // Send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendKey) {
      console.log(`[DEV] OTP for ${email}: ${code}`);
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(resendKey);
    const firstName = name?.split(' ')[0] || '';

    const { error: emailError } = await resend.emails.send({
      from: `Restaurant Perle d'Asie <noreply@cordis-explorer.eu>`,
      to: [email],
      subject: `${code} — Votre code de vérification Perle d'Asie`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#1a1814">
          <div style="background:#3d7022;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:2px">PERLE D'ASIE</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px">Restaurant — Laeken, Bruxelles</p>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e8e2da">
            ${firstName ? `<p style="margin:0 0 16px;font-size:15px">Bonjour ${firstName},</p>` : ''}
            <p style="margin:0 0 24px;color:#6b6358;line-height:1.6">
              Voici votre code pour confirmer votre commande en ligne :
            </p>
            <div style="text-align:center;margin:0 0 24px">
              <span style="display:inline-block;background:#f0f9e8;border:2px solid #3d7022;border-radius:8px;padding:16px 40px;font-size:36px;font-weight:700;letter-spacing:10px;color:#3d7022">
                ${code}
              </span>
            </div>
            <p style="margin:0;color:#9a9080;font-size:13px;text-align:center">
              Ce code expire dans <strong>10 minutes</strong>.<br>
              Si vous n'avez pas passé de commande, ignorez cet email.
            </p>
          </div>
          <div style="padding:16px 32px;background:#f0ece6;font-size:12px;color:#9a9080;text-align:center">
            Restaurant Perle d'Asie — Avenue de l'Exposition 266, 1090 Laeken
          </div>
        </div>`,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
