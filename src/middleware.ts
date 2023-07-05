import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(`/user/${token.id}`, req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      if (req.nextUrl.pathname !== "/")
        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
    } else {
      if (
        (req.nextUrl.pathname.startsWith("/user") &&
          req.nextUrl.pathname !== `/user/${token.id}`) ||
        req.nextUrl.pathname === "/"
      ) {
        return NextResponse.redirect(new URL(`/user/${token.id}`, req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/user/:path*", "/login", "/course/:path*", "/register"],
};
