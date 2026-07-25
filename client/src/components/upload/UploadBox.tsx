import { useState } from "react";

import { uploadDocument } from "../../services/document.service";

function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [documentInfo, setDocumentInfo] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setMessage("");
      setDocumentInfo(null);
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Please select a PDF first.");
      return;
    }

    try {
      setIsUploading(true);

      const data = await uploadDocument(selectedFile);

      setDocumentInfo(data);
      setMessage(data.message);
    } catch {
      setMessage("Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading}
        className="rounded-md bg-violet-600 px-5 py-2 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>

      {selectedFile && (
        <p className="text-sm text-gray-700">
          <strong>Selected File:</strong> {selectedFile.name}
        </p>
      )}

      {message && (
        <p className="text-green-600">
          {message}
        </p>
      )}

      {documentInfo && (
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="mb-3 text-lg font-semibold">
            Document Information
          </h3>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Filename:</strong> {documentInfo.filename}
            </p>

            <p>
              <strong>File Size:</strong>{" "}
              {(documentInfo.file_size / 1024).toFixed(2)} KB
            </p>

            <p>
              <strong>Pages:</strong> {documentInfo.pages}
            </p>

            <p>
              <strong>Characters:</strong> {documentInfo.characters}
            </p>

            <p>
              <strong>Chunks Created:</strong> {documentInfo.chunks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;