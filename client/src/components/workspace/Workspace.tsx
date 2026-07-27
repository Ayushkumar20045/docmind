import ChatWindow from "../chat/ChatWindow";
import Sidebar from "../layout/Sidebar";

function Workspace() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <aside className="w-72 shrink-0 border-r border-slate-800">
        <Sidebar />
      </aside>

      <main className="flex-1 min-w-0">
        <ChatWindow />
      </main>
    </div>
  );
}

export default Workspace;