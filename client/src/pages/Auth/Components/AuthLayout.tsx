import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden border-r border-slate-800 lg:flex">
          {/* Background Glow */}
          <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-center px-16">
            <span className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
              Built for curious minds.
            </span>

            <h1 className="text-6xl font-bold tracking-tight">
              DocMind
            </h1>

            <h2 className="mt-12 max-w-xl text-5xl font-bold leading-tight">
              Turn Documents
              <br />
              Into Conversations.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
              Every document has answers.
              <br />
              Just ask better questions.
            </p>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-400">
              Upload research papers, lecture notes, reports
              manuals, and PDFs to get AI-powered conversations
              grounded in your own content.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}