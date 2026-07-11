import { auth } from "@/src/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constants";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = Boolean(req.auth);

  if (pathname === "/") {
    const destination = isAuthenticated ? ROUTES.Dashboard : ROUTES.Landing;
    return NextResponse.redirect(new URL(destination, req.url));
  }
  if (pathname.startsWith("/auth") && pathname !== "/auth/impersonate" && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.Dashboard, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|css|js)).*)"],
};
