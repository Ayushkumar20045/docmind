import { useRef, useState } from "react";
import { CloudUpload, FileCheck } from "lucide-react";

import {
  uploadDocument,
  getDocuments,
} from "../../services/document.service";

import type { UploadedDocument } from "../../types/document";

interface UploadWorkspaceProps {
  onUploadSuccess: (
    document: UploadedDocument
  ) => void;
}

function UploadWorkspace({
  onUploadSuccess,
}: UploadWorkspaceProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [dragging, setDragging] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  async function uploadFile(file: File) {
    try {
      setSelectedFile(file);

      // Small delay for smoother UX
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      await uploadDocument(file);

      const documents =
        await getDocuments();

      if (documents.length === 0) {
        throw new Error(
          "No document returned after upload."
        );
      }

      onUploadSuccess(documents[0]);
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    } finally {
      setSelectedFile(null);
    }
  }

  async function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    await uploadFile(file);

    event.target.value = "";
  }

  async function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (!file) return;

    await uploadFile(file);
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFileSelect}
      />

      <div
        onClick={() => {
          if (!selectedFile) {
            fileInputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={handleDrop}
        className={`group cursor-pointer rounded-3xl border-2 border-dashed px-10 py-16 text-center transition-all duration-300 ${
          dragging
            ? "border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(37,99,235,0.18)]"
            : "border-slate-700 bg-slate-900 hover:border-blue-500 hover:bg-slate-900/80 hover:shadow-[0_0_35px_rgba(37,99,235,0.12)]"
        }`}
      >
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
            selectedFile
              ? "bg-emerald-500/10"
              : "bg-blue-600/10"
          }`}
        >
          {selectedFile ? (
            <FileCheck
              size={40}
              className="text-emerald-400"
            />
          ) : (
            <CloudUpload
              size={40}
              className={`text-blue-500 transition-all duration-300 ${
                dragging
                  ? "scale-110 -translate-y-1"
                  : "group-hover:scale-110 group-hover:-translate-y-1"
              }`}
            />
          )}
        </div>

        {selectedFile ? (
          <>
            <h2 className="mt-8 text-3xl font-bold text-white">
              {selectedFile.name}
            </h2>

            <p className="mt-3 text-emerald-400">
              Ready to upload...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Uploading your document...
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-8 text-3xl font-bold text-white">
              Drop your PDF here
            </h2>

            <p className="mt-3 text-slate-400">
              Drag & drop your document or click
              anywhere to browse.
            </p>

            <p className="mt-6 text-sm text-slate-500">
              Supports PDF files up to 20 MB
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default UploadWorkspace;