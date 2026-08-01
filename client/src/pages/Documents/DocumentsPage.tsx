import { useEffect, useState } from "react";

import { DocumentList } from "../../components/documents";
import UploadBox from "../../components/upload/UploadBox";

import {
  deleteDocument,
  getDocuments,
} from "../../services/document.service";

import type { UploadedDocument } from "../../types/document";

function DocumentsPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteDocument(id);

      setDocuments((previous) =>
        previous.filter((document) => document.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Documents
          </h1>

          <p className="mt-2 text-slate-400">
            Upload and manage your PDF documents.
          </p>
        </div>

        <UploadBox onUploadSuccess={loadDocuments} />

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Your Documents
          </h2>

          <DocumentList
            documents={documents}
            loading={loading}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}

export default DocumentsPage;