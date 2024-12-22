"use client";

import { useEffect, useState } from 'react';
import { getUserFiles, downloadFile, getAuthHeader, deleteFile, getFile } from '@/lib/api';
import { FileTableHeader } from './file/FileTableHeader';
import { FileTableRow } from './file/FileTableRow';
import { FilePreviewModal } from './file/FilePreviewModal';
import { FileItem } from '@/types/file';

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [preview, setPreview] = useState<string | null>(null);


  useEffect(() => {
    loadFiles();
    const handleFileUploaded = async () => {
      const updatedFiles = await getUserFiles();
      setFiles(updatedFiles);
    };

    window.addEventListener("fileUploaded", handleFileUploaded);

    return () => {
      window.removeEventListener("fileUploaded", handleFileUploaded);
    };
  }, []);

  async function loadFiles() {
    try {
      const data = await getUserFiles();
      setFiles(data);
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  }

  async function handleDownload(file: FileItem) {
    try {
      await downloadFile(file.id, file.name);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  }

  async function handleDelete(file: FileItem) {
    try {
      await deleteFile(file.id, file.name);
      await loadFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  }

  async function handlePreview(file: FileItem) {
    if (!file.contentType.startsWith("image/") &&
        !file.contentType.startsWith("text/") &&
        !file.contentType.includes("json")) {
      console.error("Unsupported file type for preview:", file.contentType);
      return;
    }
  
    try {
      const response = await getFile(file.id, file.name);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file for preview: ${response.statusText}`);
      }
  
      if (file.contentType.startsWith("image/")) {
        const blob = await response.blob();
        setPreview(URL.createObjectURL(blob));
      } else {
        const text = await response.text();
        setPreview(text);
      }
  
      setSelectedFile(file);
    } catch (error) {
      console.error("Failed to preview file:", error);
    }
  }

  function handleClosePreview() {
    if (preview && selectedFile?.contentType.startsWith("image/")) {
      URL.revokeObjectURL(preview);
    }
    setSelectedFile(null);
    setPreview(null);
  }
  

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <table className="w-full">
          <FileTableHeader />
          <tbody>
            {files.map((file) => (
              <FileTableRow
                key={file.id}
                file={file}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedFile && preview && (
        <FilePreviewModal
          file={selectedFile}
          preview={preview}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}