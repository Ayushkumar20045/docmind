import { Plus } from "lucide-react";

import Navigation from "./Navigation";
import RecentChats from "./RecentChats";

function Sidebar() {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950 px-5 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          DocMind
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          AI Workspace
        </p>
      </div>

      <button className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500">
        <Plus size={18} />
        New Chat
      </button>

      <div className="mt-8">
        <Navigation />
      </div>

      <div className="flex-1" />

      <RecentChats />
    </aside>
  );
}

export default Sidebar;