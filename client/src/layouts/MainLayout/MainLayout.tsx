import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen bg-slate-950">
      <Outlet />
    </div>
  );
}

export default MainLayout;