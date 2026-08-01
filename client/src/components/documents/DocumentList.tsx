import DocumentCard from "./DocumentCard";
import EmptyDocuments from "./EmptyDocuments";

import type { UploadedDocument } from "../../types/document";

interface DocumentListProps {
  documents: UploadedDocument[];
  loading: boolean;
  onDelete: (id: number) => void | Promise<void>;
}

function DocumentList({
  documents,
  loading,
  onDelete,
}: DocumentListProps) {
  if (loading) {
    return (
      <p className="text-slate-400">
        Loading documents...
      </p>
    );
  }

  if (documents.length === 0) {
    return <EmptyDocuments />;
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default DocumentList;