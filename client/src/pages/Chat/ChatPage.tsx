import { useEffect, useState } from "react";

import { checkBackend } from "../../services/health.service";

function ChatPage() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    async function fetchHealth() {
      try {
        const data = await checkBackend();
        setStatus(data.status);
      } catch {
        setStatus("Backend Offline");
      }
    }

    fetchHealth();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Welcome to DocMind
      </h1>

      <p className="text-slate-400">
        Backend Status: {status}
      </p>
    </div>
  );
}

export default ChatPage;