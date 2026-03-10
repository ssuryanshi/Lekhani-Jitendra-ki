import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code');

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'invite' | 'email' | 'recovery',
    });

    if (!error) {
      // Invite → set password first
      if (type === 'invite') {
        return NextResponse.redirect(new URL('/auth/set-password', request.url));
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}
