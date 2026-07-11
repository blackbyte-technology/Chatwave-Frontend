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

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: contactId } = await context.params;
    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/contacts/${contactId}`, {
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching contact.:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contact." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: contactId } = await context.params;
    const body = await request.json();
    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/contacts/${contactId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating contact.:", error);
    return NextResponse.json({ error: "Failed to update contact." }, { status: 500 });
  }
}
