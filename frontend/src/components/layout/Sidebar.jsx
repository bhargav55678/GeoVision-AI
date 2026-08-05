import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Analysis",
      path: "/analysis",
      icon: Search,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-cyan-500/20 min-h-screen">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-cyan-400">
          GeoVision AI
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Mission Control
        </p>

      </div>

      <nav className="mt-8">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-4 transition ${
                location.pathname === item.path
                  ? "bg-cyan-500/20 text-cyan-400 border-r-4 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={22} />
              {item.name}
            </Link>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;