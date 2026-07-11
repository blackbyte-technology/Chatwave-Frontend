import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ level: string; id: string }> }
) {
  try {
    const { level, id } = await params;
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/facebook-ads/insights/${level}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error in getFbAdInsights proxy:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
