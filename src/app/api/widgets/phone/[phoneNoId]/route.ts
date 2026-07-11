import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ phoneNoId: string }> }
) {
  try {
    const { phoneNoId } = await params;
    const session = await auth();
    const token = session?.accessToken as string;

    const response = await fetch(`${BACKEND_API_URL}/widgets/phone/${phoneNoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch widget" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch widget API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
