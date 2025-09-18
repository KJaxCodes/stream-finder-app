// me file to get current user info
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ isLoggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }
}