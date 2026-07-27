import { Bot } from "lucide-react";

import Message from "./Message";

interface AIMessageProps {
  content: string;
}

export default function AIMessage({
  content,
}: AIMessageProps) {
  return (
    <Message>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-blue-400">
          <Bot size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              DocMind
            </h3>

            <span className="text-xs text-slate-500">
              Just now
            </span>
          </div>

          <div className="space-y-4 text-[15px] leading-7 text-slate-300">
            <p className="whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>
        </div>
      </div>
    </Message>
  );
}