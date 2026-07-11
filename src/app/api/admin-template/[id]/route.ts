import { auth } from "@/src/auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from "@/src/constants/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;
    const { id } = await context.params;

    const response = await fetch(`${PUBLIC_API_URL}/admin/templates/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: "Failed to fetch admin template", details: errorText.substring(0, 200) }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch admin template", details: error.message }, { status: 500 });
  }
}
