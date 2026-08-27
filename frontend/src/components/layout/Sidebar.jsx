import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  History,
  FileText,
  Settings,
  Radio,
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
      name: "History",
      path: "/history",
      icon: History,
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
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-80
        flex-col
        border-r
        border-slate-700/20
        bg-[#10141a]/95
        backdrop-blur-xl
      "
    >

      {/* ================================= */}
      {/* BRAND */}
      {/* ================================= */}

      <div className="px-6 pt-7">

        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-cyan-400
          "
        >
          GeoVision AI
        </h1>

        <p
          className="
            mt-2
            font-mono
            text-[11px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-slate-400
          "
        >
          Mission Control
        </p>

      </div>


      {/* ================================= */}
      {/* NAVIGATION */}
      {/* ================================= */}

      <nav className="mt-12 px-4">

        <div className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path ||
              location.pathname.startsWith(
                `${item.path}/`
              );

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group
                  relative
                  flex
                  h-12
                  items-center
                  gap-4
                  rounded-md
                  px-5
                  transition-all
                  duration-200

                  ${
                    active
                      ? `
                        border-r-2
                        border-cyan-400
                        bg-cyan-400/10
                        text-cyan-400
                      `
                      : `
                        text-slate-300
                        hover:bg-slate-800/50
                        hover:text-cyan-300
                      `
                  }
                `}
              >

                {active && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-5
                      w-[2px]
                      -translate-y-1/2
                      bg-cyan-400
                      shadow-[0_0_10px_rgba(0,219,231,0.8)]
                    "
                  />
                )}

                <Icon
                  size={21}
                  strokeWidth={active ? 2.3 : 1.8}
                />

                <span
                  className={`
                    text-[15px]
                    ${
                      active
                        ? "font-semibold"
                        : "font-medium"
                    }
                  `}
                >
                  {item.name}
                </span>

              </Link>
            );

          })}

        </div>

      </nav>


      {/* ================================= */}
      {/* BOTTOM STATUS */}
      {/* ================================= */}

      <div className="mt-auto px-4 pb-6">

        <div className="border-t border-slate-700/20 pt-5">

          {/* Backend Online */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-md
              border
              border-cyan-400/10
              bg-slate-900/40
              px-4
              py-3
            "
          >

            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-400
                shadow-[0_0_10px_rgba(0,219,231,0.9)]
              "
            />

            <span
              className="
                font-mono
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-cyan-400
              "
            >
              Backend Online
            </span>

          </div>


          {/* Status */}

          <div
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              text-slate-400
            "
          >

            <Radio
              size={19}
              strokeWidth={1.8}
            />

            <span className="text-sm">
              Status
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;