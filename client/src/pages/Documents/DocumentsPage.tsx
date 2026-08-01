import { useEffect, useState } from "react";

import NavigationSidebar from "../../components/layout/NavigationSidebar";

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
        previous.filter(
          (document) => document.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <NavigationSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-white">
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
      </main>
    </div>
  );
}

export default DocumentsPage;