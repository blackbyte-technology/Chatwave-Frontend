import { auth } from "@/src/auth";
import { PUBLIC_API_URL } from '@/src/constants/route';
import { NextRequest, NextResponse } from 'next/server';

async function getAuthHeaders() {
  const session = await auth();
  const token = session?.accessToken as string | undefined;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: automationID } = await context.params;
    const body = await request.json().catch(() => ({})); // Handle empty body if any

    const headers = await getAuthHeaders();

    const response = await fetch(`${PUBLIC_API_URL}/automation/${automationID}/toggle`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error toggling automation status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to toggle automation status' },
      { status: 500 }
    );
  }
}
