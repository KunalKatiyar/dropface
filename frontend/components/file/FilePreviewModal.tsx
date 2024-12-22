import { Button } from "@/components/ui/button";

interface FilePreviewModalProps {
  file: {
    name: string;
    contentType: string;
  };
  preview: string;
  onClose: () => void;
}

export function FilePreviewModal({ file, preview, onClose }: FilePreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{file.name}</h2>
        {file.contentType.startsWith("image/") ? (
          <img
            src={preview}
            alt={file.name}
            className="max-h-[60vh] object-contain rounded-lg"
          />
        ) : (
          <pre className="max-h-[60vh] overflow-auto p-4 bg-gray-100 rounded-lg">
            {preview}
          </pre>
        )}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
