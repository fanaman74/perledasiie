import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('lotus_admin_token')?.value;

    if (token) {
      const supabase = createServerClient();
      await supabase.from('lotus_admin_sessions').delete().eq('token', token);
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set('lotus_admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
