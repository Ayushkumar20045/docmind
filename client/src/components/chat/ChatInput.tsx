import { useState } from "react";
import type { KeyboardEvent } from "react";

import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (question: string) => Promise<void>;
  loading: boolean;
}

function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [question, setQuestion] = useState("");

  async function handleSend() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setQuestion("");

    await onSend(trimmedQuestion);
  }

  async function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      await handleSend();
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-950 px-6 py-5">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl border border-slate-700 bg-slate-900 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <textarea
            rows={2}
            value={question}
            disabled={loading}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your document..."
            className="min-h-[72px] max-h-40 w-full resize-none bg-transparent px-5 py-5 pr-20 text-[15px] leading-7 text-white placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            aria-label="Send message"
            disabled={loading}
            onClick={handleSend}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;