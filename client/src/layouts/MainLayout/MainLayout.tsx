import { Outlet } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;