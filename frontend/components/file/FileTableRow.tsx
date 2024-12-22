import { FileText, Download, Eye, Delete } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { FileItem } from "@/types/file";

interface FileTableRowProps {
  file: FileItem;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onPreview: (file: FileItem) => void;
}

export function FileTableRow({ file, onDownload, onDelete, onPreview }: FileTableRowProps) {
  const canPreview = file.contentType.startsWith('image/') || 
                    file.contentType.startsWith('text/') ||
                    file.contentType.includes('json');

  return (
    <tr className="border-b">
      <td className="p-2 flex items-center gap-2">
        <FileText className="h-4 w-4" />
        {file.name}
      </td>
      <td className="p-2">{formatBytes(file.size)}</td>
      <td className="p-2">{file.contentType}</td>
      <td className="p-2">
        {new Date(file.uploadedAt).toLocaleDateString()}
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(file)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(file)}
          >
            <Delete className="h-4 w-4" />
          </Button>
          {canPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPreview(file)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}