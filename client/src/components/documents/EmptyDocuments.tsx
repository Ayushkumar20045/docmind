import { FileText } from "lucide-react";

function EmptyDocuments() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
      <FileText className="mx-auto h-12 w-12 text-slate-600" />

      <h3 className="mt-4 text-lg font-semibold text-white">
        No documents yet
      </h3>

      <p className="mt-2 text-slate-400">
        Upload your first PDF to start chatting with it.
      </p>
    </div>
  );
}

export default EmptyDocuments;