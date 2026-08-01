import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

          <div className="prose prose-invert prose-slate max-w-none">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 text-3xl font-bold text-white">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-2xl font-semibold text-white">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-3 mt-5 text-xl font-semibold text-white">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 whitespace-pre-wrap leading-7 text-slate-300">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-slate-200">
                    {children}
                  </em>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-blue-500 pl-4 italic text-slate-400">
                    {children}
                  </blockquote>
                ),

                code(props) {
                  const {
                    inline,
                    children,
                    ...rest
                  } = props as any;

                  if (inline) {
                    return (
                      <code
                        className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-blue-300"
                        {...rest}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre className="my-4 overflow-x-auto rounded-xl bg-slate-900 p-4">
                      <code
                        className="font-mono text-sm text-slate-200"
                        {...rest}
                      >
                        {children}
                      </code>
                    </pre>
                  );
                },

                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border-collapse rounded-xl overflow-hidden border border-slate-700">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-slate-800">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="border border-slate-700 px-4 py-3 text-left font-semibold text-white">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border border-slate-700 px-4 py-3 text-slate-300">
                    {children}
                  </td>
                ),

                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {children}
                  </a>
                ),

                hr: () => (
                  <hr className="my-6 border-slate-700" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>

          </div>
        </div>
      </div>
    </Message>
  );
}