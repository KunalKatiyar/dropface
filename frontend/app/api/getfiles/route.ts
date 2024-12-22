import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/auth/auth-options";

const BASE_URL = 'http://localhost:8081/api';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = session.accessToken;

  // Send the file to your backend
  const response = await fetch(`${BASE_URL}/files`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Cannot fetch files' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}

