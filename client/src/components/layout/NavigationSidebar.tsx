import Navigation from "./Sidebar/Navigation";

function NavigationSidebar() {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950 px-5 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          DocMind
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          AI Workspace
        </p>
      </div>

      <div className="mt-10 flex-1">
        <Navigation />
      </div>
    </aside>
  );
}

export default NavigationSidebar;