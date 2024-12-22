import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-options";

const BASE_URL = 'http://localhost:8081/api';

export async function getAuthHeader() {
  // const session = await getServerSession(authOptions);
  return {
    Authorization: `Bearer 123`,
  };
}

export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ email, password }),
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return {
    accessToken: data.token,
  };
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
}

export async function getUserFiles() {
  const headers = await getAuthHeader();
  const response = await fetch(`/api/getfiles`, {
    headers,
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }

  return response.json();
}

export async function getFile(fileId: number, fileName: string) {
  const response = await fetch(`/api/download?fileId=${fileId}&fileName=${fileName}`);

  if (!response.ok) {
    throw new Error('Failed to fetch file');
  }

  return response;
}

export async function downloadFile(fileId: number, fileName: string) {

  const response = await fetch(`/api/download?fileId=${fileId}&fileName=${fileName}`);

  if (!response.ok) {
    console.error('Download failed');
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function deleteFile(fileId: number, fileName: string) {

  const response = await fetch(`/api/deletefile?fileId=${fileId}&fileName=${fileName}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Deletion failed');
    return;
  }

  return response.json();
}

export async function signOut() {
  await fetch(`/api/auth/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  // Redirect to login page
  window.location.href = '/login';
}
