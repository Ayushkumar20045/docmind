import { useEffect, useState } from "react";
import {
  FileText,
  MessageSquare,
  Sparkles,
  Search,
} from "lucide-react";

import { getDocuments } from "../../services/document.service";
import { getChats } from "../../services/chat.service";

function DashboardStats() {
  const [documents, setDocuments] = useState(0);
  const [conversations, setConversations] = useState(0);

  useEffect(() => {
    async function loadStats() {
      try {
        const [docs, chats] = await Promise.all([
          getDocuments(),
          getChats(),
        ]);

        setDocuments(docs.length);
        setConversations(chats.length);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  const stats = [
    {
      title: "Documents",
      value: documents,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Chats",
      value: conversations,
      icon: MessageSquare,
      color: "text-emerald-500",
    },
    {
      title: "Summaries",
      value: "AI",
      icon: Sparkles,
      color: "text-yellow-500",
    },
    {
      title: "Search",
      value: "Fast",
      icon: Search,
      color: "text-purple-500",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map(({ title, value, icon: Icon, color }) => (
        <div
          key={title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
        >
          <Icon className={`h-7 w-7 ${color}`} />

          <p className="mt-5 text-3xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {title}
          </p>
        </div>
      ))}
    </section>
  );
}

export default DashboardStats;