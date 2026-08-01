import { useState } from "react";

import UploadDropzone from "./UploadDropzone";
import UploadStatus from "./UploadStatus";

import { uploadDocument } from "../../services/document.service";

interface UploadBoxProps {
  onUploadSuccess: () => void | Promise<void>;
}

function UploadBox({
  onUploadSuccess,
}: UploadBoxProps) {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!selectedFile) return;

    setUploading(true);
    setSuccess("");
    setError("");

    try {
      await uploadDocument(selectedFile);

      await onUploadSuccess();

      setSuccess("Your document is ready for conversation.");
      setSelectedFile(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while uploading."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <UploadDropzone
        selectedFile={selectedFile}
        onFileSelect={setSelectedFile}
      />

      <UploadStatus
        success={success}
        error={error}
      />

      {selectedFile && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBox;