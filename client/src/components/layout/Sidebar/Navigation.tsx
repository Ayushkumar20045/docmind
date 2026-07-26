import SidebarItem from "./SidebarItem";
import { navigation } from "../../../lib/navigation";

function Navigation() {
  return (
    <nav className="space-y-2">
      {navigation.map((item) => (
        <SidebarItem
          key={item.href}
          {...item}
        />
      ))}
    </nav>
  );
}

export default Navigation;