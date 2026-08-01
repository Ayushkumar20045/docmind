import type { LucideIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
  href: string;
};

function SidebarItem({
  label,
  icon: Icon,
  href,
}: SidebarItemProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleClick() {
    if (href === "/logout") {
      logout();
      navigate("/login", { replace: true });
    }
  }

  if (href === "/logout") {
    return (
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;