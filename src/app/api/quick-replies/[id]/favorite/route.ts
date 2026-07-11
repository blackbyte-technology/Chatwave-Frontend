import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/quick-replies/${id}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json({ error: "Failed to toggle favorite", message: error?.message }, { status: 500 });
  }
}
