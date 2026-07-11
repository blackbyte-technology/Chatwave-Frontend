import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function GET(request: NextRequest, { params }: { params: Promise<{ waba_id: string }> }) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;
    const { waba_id } = await params;

    const response = await fetch(`${PUBLIC_API_URL}/forms/meta-flows/${waba_id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error || "Failed to fetch meta flows" }, { status: 500 });
  }
}
