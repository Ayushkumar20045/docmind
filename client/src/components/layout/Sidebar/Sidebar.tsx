import { Plus } from "lucide-react";

import Navigation from "./Navigation";
import RecentChats from "./RecentChats";

import type { ChatHistory } from "../../../services/chat.service";

interface SidebarProps {
  selectedChatId: number | null;
  onSelectChat: (chat: ChatHistory) => void;
  onNewChat: () => void;
  refreshChats: number;
}

function Sidebar({
  selectedChatId,
  onSelectChat,
  onNewChat,
  refreshChats,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950 px-5 py-6">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          DocMind
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          AI Workspace
        </p>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
      >
        <Plus size={18} />
        New Chat
      </button>

      {/* Recent Chats */}
      <div className="mt-8 flex-1 overflow-y-auto">
        <RecentChats
          selectedChatId={selectedChatId}
          onSelectChat={onSelectChat}
          refreshChats={refreshChats}
        />
      </div>

      {/* Navigation */}
      <div className="border-t border-slate-800 pt-5">
        <Navigation />
      </div>

      {/* Creator Signature */}
      <div className="mt-6 border-t border-slate-800 pt-5">
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Designed & Developed by
        </p>

        <a
          href="https://www.linkedin.com/in/ayush-kumar-3059b7289/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-sm font-semibold text-blue-400 transition duration-300 hover:text-blue-300"
        >
          Ayush Kumar
        </a>

        <div className="mt-3 flex items-center justify-center gap-3 text-xs">
          <a
            href="https://github.com/Ayushkumar20045"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition duration-300 hover:text-white"
          >
            GitHub
          </a>

          <span className="text-slate-700">•</span>

          <a
            href="https://www.linkedin.com/in/ayush-kumar-3059b7289"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition duration-300 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;