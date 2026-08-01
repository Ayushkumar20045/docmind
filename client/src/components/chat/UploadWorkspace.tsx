import { useRef } from "react";
import { FileUp } from "lucide-react";

import {
  uploadDocument,
  getDocuments,
} from "../../services/document.service";

import type { UploadedDocument } from "../../types/document";

interface UploadWorkspaceProps {
  onUploadSuccess: (document: UploadedDocument) => void;
}

function UploadWorkspace({
  onUploadSuccess,
}: UploadWorkspaceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      await uploadDocument(file);

const documents = await getDocuments();

if (documents.length === 0) {
  throw new Error("No document returned after upload.");
}

const uploadedDocument = documents[0];

onUploadSuccess(uploadedDocument);
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/10 text-blue-500">
              <FileUp size={40} strokeWidth={1.8} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Upload your first document
            </h1>

            <p className="mt-3 max-w-lg text-slate-400">
              Upload a PDF and start asking questions, generating summaries,
              and finding information instantly.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileSelect}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-500 hover:scale-[1.02] active:scale-95"
            >
              Choose PDF
            </button>

            <p className="mt-4 text-sm text-slate-500">
              PDF files only • Maximum file size 20 MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadWorkspace;