import { FileText } from "lucide-react";

function PDFViewer() {
  return (
    <aside className="flex h-full w-full flex-col border-l border-slate-800 bg-slate-950">
      <header className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">
          Document Preview
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          No document selected
        </p>
      </header>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="flex max-w-xs flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-slate-500">
            <FileText size={40} strokeWidth={1.8} />
          </div>

          <h3 className="text-lg font-semibold text-white">
            Nothing to preview
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Upload a PDF to preview its pages while chatting with DocMind.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default PDFViewer;