import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string;
    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/campaigns`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error in bulk delete campaigns:", error);
    return NextResponse.json({ error: error || "Failed to bulk delete campaigns." }, { status: 500 });
  }
}
