import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string;
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-gateways/transactions${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Internal server error" }, { status: 500 });
  }
}
