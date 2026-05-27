import { NextRequest, NextResponse } from 'next/server';

// Token za dostop do predstavitvenega dokumenta
// Nastavi PITCH_TOKEN v Vercel Environment Variables
const PITCH_TOKEN = process.env.PITCH_TOKEN ?? 'bob-pitch-2026';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Zaščiti samo /predstavitev
  if (pathname === '/predstavitev') {
    const token = searchParams.get('token');

    if (token !== PITCH_TOKEN) {
      // Brez veljavnega tokena → 404
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/predstavitev'],
};
