import { auth } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_URL } from "@/src/constants/route";

type Params = { params: Promise<{ id: string }> };

/** PUT /api/sequences/steps/[id] — update step */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const body = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/sequences/steps/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating sequence step:", error);
    return NextResponse.json({ success: false, message: "Failed to update sequence step" }, { status: 500 });
  }
}

/** DELETE /api/sequences/steps/[id] — delete step */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = await auth();
    const token = session?.accessToken as string | undefined;

    const response = await fetch(`${PUBLIC_API_URL}/sequences/steps/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error deleting sequence step:", error);
    return NextResponse.json({ success: false, message: "Failed to delete sequence step" }, { status: 500 });
  }
}
