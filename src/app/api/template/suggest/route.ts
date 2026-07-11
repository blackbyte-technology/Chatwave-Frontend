import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/template/suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error suggesting Template:", error);
    return NextResponse.json({ error: "Failed to suggest template", details: error.message }, { status: 500 });
  }
}
