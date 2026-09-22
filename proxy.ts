import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get('host') ?? '')
    .split(':')[0]
    .toLowerCase();
  if (
    hostname !== 'archive.cowboyazib.com' &&
    hostname !== 'archive.localhost'
  ) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  if (url.pathname === '/archive' || url.pathname === '/archive/') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if (url.pathname === '/entry001' || url.pathname === '/entry001/') {
    return NextResponse.next();
  }
  url.pathname = `/archive${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
