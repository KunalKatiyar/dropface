import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/auth/auth-options";

const BASE_URL = 'http://localhost:8081/api';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = session.accessToken;

  // Get the file from the form-data request
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Send the file to your backend
  const response = await fetch(`${BASE_URL}/files/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Forward the form-data
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Upload failed' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}
