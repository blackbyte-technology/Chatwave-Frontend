import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;
    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/forms/sync-status`, {
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
    return NextResponse.json({ error: error?.data?.message || "Failed to sync status" }, { status: 500 });
  }
}
