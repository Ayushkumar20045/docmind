import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export const navigation = [
  {
    label: "Workspace",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];