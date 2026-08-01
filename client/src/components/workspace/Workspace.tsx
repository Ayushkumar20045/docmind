import { useState } from "react";

import Sidebar from "../layout/Sidebar";
import ChatWindow from "../chat/ChatWindow";

import type { UploadedDocument } from "../../types/document";
import {
  getChat,
  type ChatHistory,
  type Message,
} from "../../services/chat.service";

function Workspace() {
  const [document, setDocument] =
    useState<UploadedDocument | null>(null);

  const [selectedChatId, setSelectedChatId] =
    useState<number | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [refreshChats, setRefreshChats] =
    useState(0);
  function handleUploadSuccess(
  uploadedDocument: UploadedDocument,
) {
  console.log("refreshChats BEFORE");

setRefreshChats((previous) => {
  console.log("Previous:", previous);
  return previous + 1;
});
  setDocument(uploadedDocument);

  setSelectedChatId(null);

  setMessages([]);

  setRefreshChats((previous) => previous + 1);
} 

  async function handleSelectChat(
    chat: ChatHistory,
  ) {
    try {
      const chatDetails = await getChat(chat.id);

      setSelectedChatId(chat.id);

      setDocument({
        id: chat.document.id,
        filename: chat.document.filename,
        file_size: chat.document.file_size,
        uploaded_at: "",
      });

      setMessages(chatDetails.messages);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNewChat() {
    setSelectedChatId(null);
    setDocument(null);
    setMessages([]);
  }



  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        refreshChats={refreshChats}
      />

      <main className="flex-1 overflow-hidden">
      <ChatWindow
        document={document}
        setDocument={handleUploadSuccess}
        messages={messages}
        setMessages={setMessages}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        refreshChats={() =>
    setRefreshChats((previous) => previous + 1)
  }
/>
      </main>
    </div>
  );
}

export default Workspace;