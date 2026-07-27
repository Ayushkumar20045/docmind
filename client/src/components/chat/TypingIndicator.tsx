import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-5 backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-blue-400">
          <Bot size={18} />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-white">
            DocMind
          </p>

          <div className="flex gap-2">
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
              style={{ animationDelay: "0ms" }}
            />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
              style={{ animationDelay: "150ms" }}
            />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}