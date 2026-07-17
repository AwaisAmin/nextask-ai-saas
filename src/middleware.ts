import { NextRequest, NextResponse } from "next/server";

// Auth pages — logged-in users are redirected away
const AUTH_ROUTES = ["/login", "/register", "/verify-email"];
const PASSWORD_RESET_PREFIXES = ["/password-reset", "/reset-password"];
const OAUTH_CALLBACK_PREFIX = "/callback";

// Open routes — public AND reachable by logged-in users
const OPEN_PREFIXES = ["/", "/auth-required"];

const DEFAULT_DASHBOARD = "/dashboard";
const AUTH_GATE = "/auth-required";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession =
    request.cookies.get("nx_session")?.value ||
    request.cookies.get("refresh_token")?.value;

  const isAuthPage =
    AUTH_ROUTES.includes(pathname) ||
    PASSWORD_RESET_PREFIXES.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith(OAUTH_CALLBACK_PREFIX);

  const isOpenRoute = OPEN_PREFIXES.some((p) =>
    p === "/" ? pathname === "/" : pathname.startsWith(p),
  );

  const isPublic = isAuthPage || isOpenRoute;

  if (!hasSession && !isPublic) {
    const next = pathname + (request.nextUrl.search || "");
    return NextResponse.redirect(
      new URL(`${AUTH_GATE}?next=${next}`, request.url),
    );
  }

  // Redirect logged-in users away from auth pages only (not open routes)
  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
