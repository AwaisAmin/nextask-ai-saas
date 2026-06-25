import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/verify-email"];
const PASSWORD_RESET_PREFIXES = ["/password-reset", "/reset-password"];
const DEFAULT_LOGIN = "/login";
const DEFAULT_DASHBOARD = "/dashboard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession =
    request.cookies.get("nx_session")?.value ||
    request.cookies.get("refresh_token")?.value;

  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    PASSWORD_RESET_PREFIXES.some((p) => pathname.startsWith(p));

  if (!hasSession && !isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN, request.url));
  }

  if (hasSession && isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL(DEFAULT_DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
