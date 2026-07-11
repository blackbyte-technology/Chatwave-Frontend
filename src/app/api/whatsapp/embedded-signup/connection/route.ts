import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const session = await auth();
    const token = session?.accessToken as string;

    const response = await fetch(`${BACKEND_API_URL}/whatsapp/embedded-signup/connection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "connection failed" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("connection API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
