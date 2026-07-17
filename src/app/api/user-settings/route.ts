import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function GET() {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/user-settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return NextResponse.json({ error: "Failed to fetch user settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const contentType = request.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    let body: any;
    let fetchHeaders: Record<string, string> = {};

    if (isFormData) {
      body = await request.arrayBuffer();
      fetchHeaders = {
        "content-type": contentType,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
    } else {
      body = JSON.stringify(await request.json());
      fetchHeaders = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
    }

    const response = await fetch(`${PUBLIC_API_URL}/user-settings`, {
      method: "PUT",
      headers: fetchHeaders,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return NextResponse.json({ error: "Failed to update user settings" }, { status: 500 });
  }
}
