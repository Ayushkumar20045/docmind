function RecentChats() {
  const recentChats = [
    "Machine Learning Notes",
    "Research Paper",
    "Operating Systems",
  ];

  return (
    <div>
      <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Chats
      </h3>

      <div className="space-y-1">
        {recentChats.map((chat) => (
          <button
            key={chat}
            className="w-full truncate rounded-lg px-3 py-2.5 text-left text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
          >
            {chat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentChats;