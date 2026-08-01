import { FileText, Trash2 } from "lucide-react";

import type { UploadedDocument } from "../../types/document";

interface DocumentCardProps {
  document: UploadedDocument;
  onDelete: (id: number) => void;
}

function DocumentCard({
  document,
  onDelete,
}: DocumentCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-600/10 p-3">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {document.filename}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {(document.file_size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(document.id)}
        className="rounded-xl p-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export default DocumentCard;