import { Satellite } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-cyan-500/20 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Satellite className="h-8 w-8 text-cyan-400" />

          <div>
            <h1 className="text-xl font-bold text-white">
              GeoVision AI
            </h1>

            <p className="text-xs text-slate-400">
              See Earth Through Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}

        <ul className="hidden gap-8 text-slate-300 md:flex">
          <li className="cursor-pointer transition hover:text-cyan-400">
            Home
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            Dashboard
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            Analysis
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            Reports
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            About
          </li>
        </ul>

        {/* Status */}

        <div className="hidden rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 md:block">
          <span className="text-sm font-medium text-green-400">
            🟢 Mission Ready
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;