import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/verify-email"];
const PASSWORD_RESET_PREFIX = "/password-reset";
const DEFAULT_LOGIN = "/login";
const DEFAULT_DASHBOARD = "/";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = request.cookies.get("refresh_token")?.value;
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith(PASSWORD_RESET_PREFIX);

  if (!hasSession && !isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN, request.url));
  }

  if (hasSession && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
