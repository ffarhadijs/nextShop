import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";

export default function middleware(req: NextRequest) {
  let token = req.cookies.get("token")?.value;

  let url = req.url;

  if (!token && url!.includes("/dashboard")) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}
