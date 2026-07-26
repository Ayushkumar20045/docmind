import { Upload } from "lucide-react";

function UploadButton() {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-95">
      <Upload className="h-4 w-4" />
      Upload PDF
    </button>
  );
}

export default UploadButton;