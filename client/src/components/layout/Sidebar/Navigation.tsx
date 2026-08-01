import SidebarItem from "./SidebarItem";
import { navigation } from "../../../lib/navigation";

function Navigation() {
  const mainItems = navigation.filter(
    (item) => item.href !== "/logout"
  );

  const logoutItem = navigation.find(
    (item) => item.href === "/logout"
  );

  return (
    <nav className="flex h-full flex-col">
      <div className="space-y-2">
        {mainItems.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
          />
        ))}
      </div>

      <div className="mt-auto border-t border-slate-800 pt-5">
        {logoutItem && (
          <SidebarItem {...logoutItem} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;