import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/whatsapp/calling/logs/bulk-delete`, {
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
    console.error("Error bulk deleting logs:", error);
    return NextResponse.json({ error: "Failed to bulk delete logs" }, { status: 500 });
  }
}
