import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const formData = await request.formData();

    const response = await fetch(`${PUBLIC_API_URL}/chatbots/extract-doc`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error extracting document:", error);
    return NextResponse.json({ success: false, message: "Failed to extract document" }, { status: 500 });
  }
}
