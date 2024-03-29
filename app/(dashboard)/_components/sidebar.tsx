import { Logo } from "./logo";

import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="relative h-full border-r flex flex-col overflow-y-auto shadow-sm bg-primary">
      <div className="p-6">
        <Logo />
      </div>
      <nav className="flex flex-col w-full">
        <SidebarRoutes />
      </nav>
    </div>
  );
};
