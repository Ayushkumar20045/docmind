import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import Hero from "../dashboard/Hero";
import DashboardStats from "../dashboard/DashboardStats";


import AIMessage from "./AIMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import UploadWorkspace from "./UploadWorkspace";
import UserMessage from "./UserMessage";

import {
  askQuestion,
  type Message,
} from "../../services/chat.service";

import type { UploadedDocument } from "../../types/document";

interface ChatWindowProps {
  document: UploadedDocument | null;

setDocument: (
  document: UploadedDocument
) => void;

  messages: Message[];

  setMessages: Dispatch<
    SetStateAction<Message[]>
  >;

  selectedChatId: number | null;

  setSelectedChatId: Dispatch<
    SetStateAction<number | null>
  >;
  refreshChats: () => void;
}

function ChatWindow({
  document,
  setDocument,
  messages,
  setMessages,
  refreshChats,
}: ChatWindowProps) {
  const [loading, setLoading] =
    useState(false);
    const messagesEndRef =
  useRef<HTMLDivElement>(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

async function handleSend(question: string) {
  if (!document) {
    return;
  }

  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: question,
    created_at: new Date().toISOString(),
  };

  setMessages((previous) => [
    ...previous,
    userMessage,
  ]);

  setLoading(true);

  try {
    const response = await askQuestion(
      document.id,
      question
    );
    refreshChats();

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: response.answer,
      created_at: new Date().toISOString(),
    };

    setMessages((previous) => [
      ...previous,
      assistantMessage,
    ]);
  } catch (error) {
    console.error(error);

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Something went wrong while getting a response. Please try again.",
        created_at: new Date().toISOString(),
      },
    ]);
  } finally {
    setLoading(false);
  }
}

if (!document) {
  return (
    <section className="h-full overflow-y-auto px-8 py-8">
      <div className="mx-auto flex max-w-6xl flex-col space-y-8">
<Hero />

<div className="mt-6">
    <UploadWorkspace
        onUploadSuccess={(uploadedDocument) =>
            setDocument(uploadedDocument)
        }
    />
</div>
</div>
<div className="mt-6">
    <DashboardStats />
</div>
    </section>
    
  );
}

  return (
    <div className="flex h-full flex-col">
      <section className="flex-1 overflow-y-auto px-8 py-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-2xl">
                📄
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {document.filename}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {(document.file_size / 1024 / 1024).toFixed(2)} MB
                </p>

                <p className="mt-3 text-sm text-emerald-400">
                  Your document is ready for conversation.
                </p>
              </div>
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-24">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white">
                  Your document is ready.
                </h2>

                <p className="mt-3 text-slate-400">
                  Ask your first question below to begin chatting with your
                  document.
                </p>
              </div>
            </div>
          ) : (
<div className="flex flex-col gap-6">
  {messages.map((message) =>
    message.role === "user" ? (
      <UserMessage
        key={message.id}
        content={message.content}
      />
    ) : (
      <AIMessage
        key={message.id}
        content={message.content}
      />
    )
  )}

  {loading && <TypingIndicator />}

  <div ref={messagesEndRef} />
</div>
          )}
        </div>
      </section>

      <ChatInput
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}

export default ChatWindow;