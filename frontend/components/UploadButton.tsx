"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getUserFiles, uploadFile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function UploadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      "text/*": [".txt", ".json"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      try {
        setUploading(true);
        const file = acceptedFiles[0];
        
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);

        await uploadFile(file);

        clearInterval(interval);
        setUploadProgress(100);
        
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });

        const event = new CustomEvent("fileUploaded", { detail: { file } });
        window.dispatchEvent(event);


        setTimeout(() => {
          setIsOpen(false);
          setUploadProgress(0);
          router.refresh();
        }, 2000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload file",
        });
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload File Dialog</DialogTitle>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div
              {...getRootProps({
                className: "border-2 border-dashed border-gray-300 rounded-lg p-8 w-full flex flex-col items-center justify-center cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX, PNG, JPG, GIF, TXT, JSON (max 10MB)
                </p>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <p className="text-sm">Uploading...</p>
              </div>
              <Progress value={uploadProgress} className="h-1" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}