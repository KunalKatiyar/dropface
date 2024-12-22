import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Clear the session cookie
    return NextResponse.json({ message: "Logged out successfully" }, {
      headers: {
        "Set-Cookie": "next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    });
  }

  return NextResponse.json({ message: "No active session" }, { status: 400 });
}
