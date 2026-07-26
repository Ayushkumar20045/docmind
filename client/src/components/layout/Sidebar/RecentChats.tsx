const recentChats = [
  "Machine Learning Notes",
  "Research Paper",
  "Operating Systems",
];

function RecentChats() {
  return (
    <div className="mt-8">
      <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Recent Chats
      </h3>

      <div className="space-y-1">
        {recentChats.map((chat) => (
          <button
            key={chat}
            className="w-full truncate rounded-xl px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            {chat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentChats;