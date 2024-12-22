import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/auth/auth-options";

const BASE_URL = 'http://localhost:8081/api';

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const fileId = url.searchParams.get('fileId');
  const fileName = url.searchParams.get('fileName');

  if (!fileId || !fileName) {
    return NextResponse.json({ error: 'No file ID or file name provided' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = session.accessToken;

  // Fetch the file from your backend
  const response = await fetch(`${BASE_URL}/files/download/${fileId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Download failed' }, { status: response.status });
  }

  // Stream the file content to the client
  const blob = await response.blob();
  return new NextResponse(blob, {
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': blob.type,
    },
  });
}
