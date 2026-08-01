import { useEffect, useState } from "react";

import {
  getChats,
  type ChatHistory,
} from "../../../services/chat.service";

interface RecentChatsProps {
  selectedChatId: number | null;
  onSelectChat: (chat: ChatHistory) => void;
}

function RecentChats({
  selectedChatId,
  onSelectChat,
}: RecentChatsProps) {
  const [chats, setChats] = useState<ChatHistory[]>([]);

  useEffect(() => {
    async function loadChats() {
      try {
        const data = await getChats();

        setChats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadChats();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Recent Chats
      </h3>

      <div className="space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full truncate rounded-xl px-4 py-3 text-left text-sm transition ${
              selectedChatId === chat.id
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {chat.title ?? chat.document.filename}
          </button>
        ))}

        {chats.length === 0 && (
          <p className="px-4 text-sm text-slate-500">
            No chats yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentChats;