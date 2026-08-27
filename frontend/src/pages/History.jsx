import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Bell,
  CircleHelp,
  History as HistoryIcon,
  LayoutDashboard,
  FileText,
  Settings,
  Radio,
  ArrowRight,
  ChevronDown,
  Activity,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] = useState("ALL");

  // -----------------------------------------
  // FETCH HISTORY
  // -----------------------------------------

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/history/`);

      if (!response.ok) {
        throw new Error("Failed to load analysis history.");
      }

      const data = await response.json();

      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("HISTORY ERROR:", err);

      setError("Unable to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // -----------------------------------------
  // FORMAT DATE
  // -----------------------------------------

  const formatDate = (date) => {
    if (!date) return "UNKNOWN";

    try {
      return new Date(date)
        .toISOString()
        .replace("T", " ")
        .replace(".000Z", "Z");
    } catch {
      return "UNKNOWN";
    }
  };

  // -----------------------------------------
  // STATUS
  // -----------------------------------------

  const getStatus = (item) => {
    if (item.status) {
      return item.status;
    }

    return Number(item.changed_regions) > 0
      ? "Change Detected"
      : "No Change";
  };

  // -----------------------------------------
  // FILTER HISTORY
  // -----------------------------------------

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const status = getStatus(item).toLowerCase();

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        !search ||
        String(item.id || "")
          .toLowerCase()
          .includes(search) ||
        String(item.before_image || "")
          .toLowerCase()
          .includes(search) ||
        String(item.after_image || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "DETECTED" &&
          status === "change detected") ||
        (statusFilter === "NO CHANGE" &&
          status === "no change");

      return matchesSearch && matchesStatus;
    });
  }, [history, searchTerm, statusFilter]);

  // -----------------------------------------
  // NAVIGATION
  // -----------------------------------------

  const navItems = [
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
      icon: HistoryIcon,
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

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-[#10141a] text-[#dfe2eb]">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div
          className="
            absolute
            inset-0
            opacity-30
            grayscale
          "
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 70% 30%,
                rgba(0,219,231,0.08),
                transparent 30%
              ),
              radial-gradient(
                circle at 30% 70%,
                rgba(78,222,163,0.05),
                transparent 30%
              ),
              linear-gradient(
                rgba(16,20,26,0.85),
                rgba(10,14,20,0.96)
              )
            `,
          }}
        />

        {/* Subtle map-like grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0,219,231,0.6) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(0,219,231,0.6) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />

      </div>


      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen
          w-[320px]
          flex-col
          border-r
          border-[#3a494b]/20
          bg-[#10141a]/90
          px-4
          py-6
          backdrop-blur-xl
          md:flex
        "
      >

        {/* Logo */}

        <div className="mb-10 px-2">

          <h1
            className="
              font-['Space_Grotesk']
              text-2xl
              font-bold
              tracking-tight
              text-[#00dbe7]
            "
          >
            GeoVision AI
          </h1>

          <p
            className="
              mt-2
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#b9cacb]
              opacity-70
            "
          >
            Mission Control
          </p>

        </div>


        {/* Navigation */}

        <nav className="flex flex-1 flex-col gap-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            const active = item.path === "/history";

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group
                  flex
                  items-center
                  gap-4
                  rounded-lg
                  px-5
                  py-3
                  transition-all
                  duration-200

                  ${
                    active
                      ? `
                        border-r-2
                        border-[#00dbe7]
                        bg-[#00dbe7]/10
                        font-bold
                        text-[#00dbe7]
                      `
                      : `
                        text-[#b9cacb]
                        hover:bg-[#262a31]/60
                        hover:text-[#00dbe7]
                      `
                  }
                `}
              >

                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                />

                <span className="text-base">
                  {item.name}
                </span>

              </Link>
            );
          })}

        </nav>


        {/* Bottom */}

        <div
          className="
            border-t
            border-[#3a494b]/20
            pt-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2
              border
              border-[#3a494b]/40
              bg-[#262a31]
              px-4
              py-3
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#dfe2eb]
            "
          >

            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[#00dbe7]
                shadow-[0_0_10px_rgba(0,219,231,0.8)]
              "
            />

            Backend Online

          </div>


          <div
            className="
              flex
              items-center
              gap-4
              px-5
              py-2
              text-sm
              text-[#b9cacb]
            "
          >

            <Radio
              size={18}
              className="text-[#4edea3]"
            />

            Status

          </div>


          {/* Small profile */}

          <div className="mt-5 flex items-center px-5">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#00dbe7]/30
                bg-[#262a31]
                font-mono
                text-xs
                font-bold
                text-[#00dbe7]
              "
            >
              GV
            </div>

          </div>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="relative z-10 min-h-screen md:ml-[320px]">


        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <header
          className="
            fixed
            right-0
            top-0
            z-40
            flex
            h-16
            w-full
            items-center
            justify-end
            gap-4
            border-b
            border-[#3a494b]/20
            bg-[#10141a]/70
            px-6
            backdrop-blur-xl
            md:w-[calc(100%-320px)]
          "
        >

          {/* Search */}

          <div className="relative hidden w-80 sm:block">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#b9cacb]
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search history..."
              className="
                w-full
                rounded-full
                border
                border-[#3a494b]/40
                bg-[#262a31]/70
                py-2
                pl-11
                pr-4
                font-sans
                text-sm
                text-[#dfe2eb]
                outline-none
                transition
                placeholder:text-[#b9cacb]/50
                focus:border-[#00dbe7]
                focus:ring-1
                focus:ring-[#00dbe7]/30
              "
            />

          </div>


          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#b9cacb]
              transition
              hover:bg-[#262a31]
              hover:text-[#00dbe7]
            "
          >
            <Bell size={21} />
          </button>


          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#b9cacb]
              transition
              hover:bg-[#262a31]
              hover:text-[#00dbe7]
            "
          >
            <CircleHelp size={21} />
          </button>


          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#00dbe7]/30
              bg-[#262a31]
              font-mono
              text-[10px]
              font-bold
              text-[#00dbe7]
            "
          >
            GV
          </div>

        </header>


        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            mx-auto
            min-h-screen
            max-w-[1500px]
            px-6
            pb-12
            pt-24
            lg:px-8
          "
        >


          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <h2
                className="
                  font-['Space_Grotesk']
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-[#dfe2eb]
                "
              >
                Analysis History
              </h2>

              <p
                className="
                  mt-2
                  text-base
                  text-[#b9cacb]
                "
              >
                Review your previous satellite image comparisons
              </p>

            </div>


            {/* Filter */}

            <div className="relative">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="
                  appearance-none
                  border
                  border-[#3a494b]/40
                  bg-[#1c2026]
                  px-4
                  py-3
                  pr-11
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#dfe2eb]
                  outline-none
                  transition
                  focus:border-[#00dbe7]
                "
              >

                <option value="ALL">
                  ALL STATUSES
                </option>

                <option value="DETECTED">
                  CHANGE DETECTED
                </option>

                <option value="NO CHANGE">
                  NO CHANGE
                </option>

              </select>

              <ChevronDown
                size={17}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#b9cacb]
                "
              />

            </div>

          </div>


          {/* Mobile Search */}

          <div className="mb-6 sm:hidden">

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#b9cacb]
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search history..."
                className="
                  w-full
                  border
                  border-[#3a494b]/40
                  bg-[#1c2026]
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-[#dfe2eb]
                  outline-none
                  focus:border-[#00dbe7]
                "
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (

            <div
              className="
                flex
                min-h-[400px]
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <div
                  className="
                    mx-auto
                    h-12
                    w-12
                    animate-spin
                    rounded-full
                    border-2
                    border-[#3a494b]
                    border-t-[#00dbe7]
                  "
                />

                <p
                  className="
                    mt-4
                    font-mono
                    text-xs
                    uppercase
                    tracking-[0.1em]
                    text-[#b9cacb]
                  "
                >
                  Loading analysis history...
                </p>

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {!loading && error && (

            <div
              className="
                border
                border-[#ffb4ab]/30
                bg-[#93000a]/10
                p-10
                text-center
              "
            >

              <Activity
                size={30}
                className="mx-auto text-[#ffb4ab]"
              />

              <h3
                className="
                  mt-4
                  font-['Space_Grotesk']
                  text-xl
                  font-semibold
                  text-[#ffb4ab]
                "
              >
                Unable to load history
              </h3>

              <p className="mt-2 text-[#b9cacb]">
                {error}
              </p>

              <button
                onClick={fetchHistory}
                className="
                  mt-6
                  bg-[#00dbe7]
                  px-6
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#002022]
                  transition
                  hover:bg-[#74f5ff]
                "
              >
                Try Again
              </button>

            </div>

          )}


          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            filteredHistory.length === 0 && (

              <div
                className="
                  border
                  border-[#3a494b]/40
                  bg-[#111827]/80
                  p-16
                  text-center
                  backdrop-blur-xl
                "
              >

                <HistoryIcon
                  size={40}
                  className="
                    mx-auto
                    text-[#00dbe7]
                    opacity-70
                  "
                />

                <h3
                  className="
                    mt-5
                    font-['Space_Grotesk']
                    text-2xl
                    font-semibold
                  "
                >
                  No Analysis Records
                </h3>

                <p
                  className="
                    mt-2
                    text-[#b9cacb]
                  "
                >
                  No records match your current search.
                </p>

                <Link
                  to="/analysis"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    bg-[#00dbe7]
                    px-6
                    py-3
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-[#002022]
                    transition
                    hover:bg-[#74f5ff]
                  "
                >
                  Start Analysis
                  <ArrowRight size={16} />
                </Link>

              </div>

            )}


          {/* ================================================= */}
          {/* HISTORY GRID */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            filteredHistory.length > 0 && (

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  xl:grid-cols-2
                "
              >

                {filteredHistory.map((item) => {

                  const status = getStatus(item);

                  const detected =
                    status.toLowerCase() ===
                    "change detected";

                  const imagePath =
                    item.comparison_image
                      ? item.comparison_image.replace(
                          /\\/g,
                          "/"
                        )
                      : null;

                  return (

                    <div
                      key={item.id}
                      className="
                        group
                        relative
                        flex
                        flex-col
                        overflow-hidden
                        rounded-lg
                        border
                        border-white/10
                        bg-[#111827]/80
                        p-4
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-[#00dbe7]/30
                      "
                    >

                      {/* Status rail */}

                      <div
                        className={`
                          absolute
                          left-0
                          top-0
                          h-full
                          w-1

                          ${
                            detected
                              ? "bg-[#ffb4ab]"
                              : "bg-[#3a494b]"
                          }
                        `}
                      />


                      <div
                        className="
                          flex
                          flex-col
                          gap-4
                          sm:flex-row
                        "
                      >

                        {/* ================================================= */}
                        {/* IMAGE */}
                        {/* ================================================= */}

                        <div
                          className="
                            relative
                            h-32
                            w-full
                            shrink-0
                            overflow-hidden
                            rounded
                            border
                            border-[#3a494b]/50
                            bg-[#0a0e14]
                            sm:w-40
                          "
                        >

                          {imagePath ? (

                            <img
                              src={`${API_URL}/${imagePath}`}
                              alt={`Analysis ${item.id}`}
                              className={`
                                h-full
                                w-full
                                object-cover
                                transition-all
                                duration-500

                                ${
                                  detected
                                    ? `
                                      grayscale
                                      group-hover:grayscale-0
                                    `
                                    : `
                                      grayscale
                                      opacity-70
                                      group-hover:opacity-100
                                    `
                                }
                              `}
                            />

                          ) : (

                            <div
                              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                font-mono
                                text-xs
                                uppercase
                                text-[#849495]
                              "
                            >
                              NO IMAGE
                            </div>

                          )}


                          {/* HUD border */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-2
                              border
                              border-[#00dbe7]/20
                            "
                          />

                        </div>


                        {/* ================================================= */}
                        {/* DETAILS */}
                        {/* ================================================= */}

                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            flex-col
                            justify-between
                          "
                        >

                          {/* Top row */}

                          <div>

                            <div
                              className="
                                mb-3
                                flex
                                flex-col
                                gap-2
                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                              "
                            >

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
                                "
                              >

                                <span
                                  className={`
                                    font-mono
                                    text-sm
                                    font-bold
                                    ${
                                      detected
                                        ? "text-[#00dbe7]"
                                        : "text-[#b9cacb]"
                                    }
                                  `}
                                >
                                  #GV-{String(item.id).padStart(4, "0")}
                                </span>

                                <span
                                  className="
                                    font-mono
                                    text-xs
                                    text-[#b9cacb]
                                  "
                                >
                                  {formatDate(item.created_at)}
                                </span>

                              </div>


                              {/* Status */}

                              {detected ? (

                                <span
                                  className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-1.5
                                    border
                                    border-[#ffb4ab]/20
                                    bg-[#93000a]/10
                                    px-2
                                    py-1
                                    font-mono
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#ffb4ab]
                                  "
                                >

                                  <span
                                    className="
                                      h-1.5
                                      w-1.5
                                      animate-pulse
                                      rounded-full
                                      bg-[#ffb4ab]
                                    "
                                  />

                                  DETECTED

                                </span>

                              ) : (

                                <span
                                  className="
                                    inline-flex
                                    w-fit
                                    border
                                    border-[#3a494b]/50
                                    bg-[#262a31]
                                    px-2
                                    py-1
                                    font-mono
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#b9cacb]
                                  "
                                >
                                  NO CHANGE
                                </span>

                              )}

                            </div>


                            {/* Statistics */}

                            <div
                              className="
                                mb-3
                                grid
                                grid-cols-2
                                gap-2
                              "
                            >

                              <div
                                className="
                                  rounded
                                  border
                                  border-[#3a494b]/20
                                  bg-[#181c22]
                                  p-2
                                "
                              >

                                <p
                                  className="
                                    font-mono
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#b9cacb]
                                  "
                                >
                                  Affected Area
                                </p>

                                <p
                                  className="
                                    mt-1
                                    font-mono
                                    text-sm
                                    text-[#dfe2eb]
                                  "
                                >
                                  {item.changed_area_percentage ?? 0}%
                                </p>

                              </div>


                              <div
                                className="
                                  rounded
                                  border
                                  border-[#3a494b]/20
                                  bg-[#181c22]
                                  p-2
                                "
                              >

                                <p
                                  className="
                                    font-mono
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#b9cacb]
                                  "
                                >
                                  Confidence
                                </p>

                                <p
                                  className="
                                    mt-1
                                    font-mono
                                    text-sm
                                    text-[#dfe2eb]
                                  "
                                >
                                  {item.confidence ?? 0}%
                                </p>

                              </div>

                            </div>


                            {/* File information */}

                            <div
                              className="
                                font-mono
                                text-[10px]
                                leading-relaxed
                                text-[#b9cacb]/70
                              "
                            >

                              <div className="truncate">
                                REF: {item.before_image || "UNKNOWN"}
                              </div>

                              <div className="truncate">
                                CMP: {item.after_image || "UNKNOWN"}
                              </div>

                            </div>

                          </div>


                          {/* Button */}

                          <div
                            className="
                              mt-4
                              flex
                              justify-end
                            "
                          >

                            <Link
                              to={`/history/${item.id}`}
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                font-mono
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                transition-all

                                ${
                                  detected
                                    ? `
                                      bg-[#00dbe7]
                                      text-[#002022]
                                      hover:bg-[#74f5ff]
                                    `
                                    : `
                                      border
                                      border-[#00dbe7]/50
                                      text-[#00dbe7]
                                      hover:bg-[#00dbe7]/10
                                    `
                                }
                              `}
                            >

                              {detected
                                ? "VIEW RESULT"
                                : "REVIEW LOGS"}

                              <ArrowRight size={15} />

                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}


          {/* ================================================= */}
          {/* LOAD OLDER */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            filteredHistory.length > 0 &&
            history.length > 0 && (

              <div className="mt-10 flex justify-center">

                <button
                  onClick={fetchHistory}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#3a494b]/60
                    px-6
                    py-2.5
                    font-mono
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-[#b9cacb]
                    transition
                    hover:border-[#00dbe7]/50
                    hover:bg-[#262a31]
                    hover:text-[#00dbe7]
                  "
                >

                  REFRESH RECORDS

                  <ChevronDown
                    size={15}
                    className="rotate-180"
                  />

                </button>

              </div>

            )}

        </main>

      </div>

    </div>
  );
};

export default History;