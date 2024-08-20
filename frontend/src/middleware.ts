import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./utils/auth.utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((err) => {
      console.log("Token verification error:", err);
    }));

  if (!verifiedToken) {
    console.log("No valid token, checking routes...");

    if (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")) {
      console.log("Allowing access to login or register route");
      return NextResponse.next();
    }

    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Valid token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};