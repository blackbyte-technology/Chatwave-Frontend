import { auth } from "@/src/auth";
import { NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function POST() {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/contacts/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Export contacts error:", error);
    return NextResponse.json({ message: "Failed to export contacts" }, { status: 500 });
  }
}
