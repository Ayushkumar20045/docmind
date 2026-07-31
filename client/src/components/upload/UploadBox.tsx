import { useState } from "react";
import axios from "axios";

import UploadDropzone from "./UploadDropzone";
import UploadStatus from "./UploadStatus";

import { uploadDocument } from "../../services/document.service";
import tokenStorage from "../../utils/token";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!selectedFile) return;

    setUploading(true);
    setSuccess("");
    setError("");

    console.log("Selected File:", selectedFile);
    console.log("Stored Token:", tokenStorage.get());

    try {
      const response = await uploadDocument(selectedFile);

      console.log("Upload Response:", response);

      setSuccess("Your document is ready for conversation.");
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload Error:", err);

      if (axios.isAxiosError(err)) {
        console.log("Response Status:", err.response?.status);
        console.log("Response Data:", err.response?.data);

        setError(
          err.response?.data?.detail ??
            "Failed to upload document."
        );
      } else {
        setError("Something went wrong while uploading.");
      }
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
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      )}
    </div>
  );
}