import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(_request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;
    const { locale } = await params;

    if (!locale) {
      return NextResponse.json({ message: "Locale is required" }, { status: 400 });
    }

    const response = await fetch(`${BACKEND_API_URL}/languages/translations/${locale}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch translations" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Language Translations GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
