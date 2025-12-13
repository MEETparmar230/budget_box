import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isLogin = req.nextUrl.pathname.startsWith("/login");

  if (!token && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
