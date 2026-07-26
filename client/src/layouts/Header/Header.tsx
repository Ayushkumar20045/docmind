function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-white">
          DocMind
        </h1>

        <p className="text-sm text-slate-400">
          AI-powered document assistant
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Current Document
        </p>

        <p className="text-sm text-slate-300">
          No document selected
        </p>
      </div>
    </header>
  );
}

export default Header;