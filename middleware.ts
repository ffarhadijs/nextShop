import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextApiRequest & NextRequest) {
  let token = req.cookies?.get("token")?.value;
  let url = req.url;

  if (
    !token &&
    (url!.includes("admin") ||
      url!.includes("profile") ||
      url!.includes("shipping") ||
      url!.includes("orders"))
  ) {
    return NextResponse.redirect(new URL('/login', url));
  }
  if (token && (url!.includes("login") || url!.includes("signup"))) {
    return NextResponse.redirect(new URL('/', url));
  }
}
