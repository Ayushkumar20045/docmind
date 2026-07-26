import { SendHorizontal } from "lucide-react";

function ChatInput() {
  return (
    <div className="border-t border-slate-800 bg-slate-950 p-6">
      <div className="mx-auto flex max-w-5xl items-end gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3 transition focus-within:border-blue-500">
        <textarea
          rows={1}
          placeholder="Ask anything about your document..."
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-white placeholder:text-slate-500 focus:outline-none"
        />

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
          aria-label="Send message"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;