import UploadBox from "../../components/upload/UploadBox";

function DocumentsPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Documents
      </h1>

      <UploadBox />
    </div>
  );
}

export default DocumentsPage;