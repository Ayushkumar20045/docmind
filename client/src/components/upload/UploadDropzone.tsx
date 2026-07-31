import { Upload } from "lucide-react";

interface UploadDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

export default function UploadDropzone({
  selectedFile,
  onFileSelect,
}: UploadDropzoneProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }

    onFileSelect(file);
  }

  return (
    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-12 transition hover:border-blue-500 hover:bg-slate-900">
      <Upload className="mb-5 h-12 w-12 text-blue-400 transition group-hover:scale-110" />

      <h3 className="text-xl font-semibold text-white">
        Upload Your Documents
      </h3>

      <p className="mt-3 text-center text-slate-400">
        Drag & drop your PDF here
        <br />
        or click anywhere to browse.
      </p>

      <span className="mt-6 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
        PDF only
      </span>

      {selectedFile && (
        <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-blue-300">
          {selectedFile.name}
        </div>
      )}

      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
}