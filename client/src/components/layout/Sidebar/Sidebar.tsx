function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DocMind</h1>
      </div>

      <nav className="px-4 space-y-2">
        <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-left hover:bg-indigo-700 transition">
          + New Chat
        </button>

        <button className="w-full rounded-lg px-4 py-2 text-left hover:bg-slate-800 transition">
          Documents
        </button>

        <button className="w-full rounded-lg px-4 py-2 text-left hover:bg-slate-800 transition">
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;