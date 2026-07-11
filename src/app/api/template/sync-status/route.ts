import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;
    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/template/sync-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: "Failed to sync templates status", details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
