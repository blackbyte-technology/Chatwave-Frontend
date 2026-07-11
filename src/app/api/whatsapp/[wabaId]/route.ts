import { auth } from "@/src/auth";
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";

async function getAuthHeaders() {
  const session = await auth();
  const token = session?.accessToken as string | undefined;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function GET(request: NextRequest, context: { params: Promise<{ wabaId: string }> }) {
  try {
    const { wabaId } = await context.params;
    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/whatsapp/${wabaId}/phone-numbers`, {
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching wabaId:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch wabaId" }, { status: 500 });
  }
}
