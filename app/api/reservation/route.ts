import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guests, date, time, firstName, lastName, email, phone, specialRequests, locale, code } = body;

    if (!guests || !date || !time || !firstName || !email) {
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

    // Mark OTP used
    await supabase.from('otps').update({ used: true }).eq('id', otp.id);

    const { data, error } = await supabase.from('reservations').insert({
      guests, date, time,
      first_name: firstName,
      last_name: lastName || '',
      email, phone: phone || null,
      special_requests: specialRequests || null,
      locale: locale || 'fr',
    }).select('id').single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Trigger confirmation email via Edge Function (fire-and-forget)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && serviceKey) {
        fetch(`${supabaseUrl}/functions/v1/reservation-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({
            reservation: {
              id: data.id, guests, date, time,
              first_name: firstName, last_name: lastName || '',
              email, phone: phone || null,
              special_requests: specialRequests || null,
              locale: locale || 'fr',
            },
          }),
        }).catch(console.error);
      }
    } catch (_) { /* email is non-blocking */ }

    return NextResponse.json({ success: true, id: data.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
