import { FileText } from "lucide-react";

function PdfViewer() {
  return (
    <aside className="flex w-80 flex-col border-l border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 p-5">
        <h2 className="font-semibold text-white">
          Document Preview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          No document selected
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center text-slate-500">
          <FileText className="mb-4 h-14 w-14" />
          <p className="text-sm">
            Upload a doument to preview it here.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default PdfViewer;