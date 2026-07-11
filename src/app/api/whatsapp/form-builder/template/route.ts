import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/forms/template`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error?.data?.message || "Failed to fetch form templates" }, { status: 500 });
  }
}
