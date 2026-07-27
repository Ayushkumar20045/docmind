import type { ReactNode } from "react";
import clsx from "clsx";

interface MessageProps {
  children: ReactNode;
  isUser?: boolean;
}

export default function Message({
  children,
  isUser = false,
}: MessageProps) {
  return (
    <div
      className={clsx(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-4xl rounded-2xl px-6 py-5 transition-all duration-300",
          isUser
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
            : "border border-slate-700 bg-slate-800/80 text-slate-100 backdrop-blur-sm"
        )}
      >
        {children}
      </div>
    </div>
  );
}