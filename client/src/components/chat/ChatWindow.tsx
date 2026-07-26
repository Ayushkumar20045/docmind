function ChatWindow() {
  return (
    <section className="flex flex-1 items-center justify-center px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-slate-800 bg-slate-900 px-4 py-1 text-sm text-slate-400">
          DocMind
        </span>

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">
          What would you like to learn
          <br />
          from your document?
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Upload a PDF and start a conversation
          powered by AI.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "Summarize",
            "Key Insights",
            "Explain Concepts",
            "Quiz Me",
          ].map((item) => (
            <button
              key={item}
              className="rounded-full border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChatWindow;