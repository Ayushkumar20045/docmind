import { CheckCircle2, AlertCircle } from "lucide-react";

interface UploadStatusProps {
  success?: string;
  error?: string;
}

export default function UploadStatus({
  success,
  error,
}: UploadStatusProps) {
  if (!success && !error) {
    return null;
  }

  if (success) {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-300">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />

        <div>
          <p className="font-medium">Upload Successful</p>
          <p className="mt-1 text-sm">{success}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />

      <div>
        <p className="font-medium">Upload Failed</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    </div>
  );
}