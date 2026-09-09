import Sidebar from "../components/layout/Sidebar";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Bell,
  HelpCircle,
} from "lucide-react";

import { getHealth } from "../services/api";

import AnalyticsStats from "../components/AnalyticsStats";
import AnalysisChart from "../components/AnalysisChart";
import AnalysisTrendChart from "../components/AnalysisTrendChart";

const API_URL = "https://geovision-ai-f3h3.onrender.com";

const Dashboard = () => {

  const [backendStatus, setBackendStatus] =
    useState("Checking...");

  const [analytics, setAnalytics] =
    useState(null);

  const [loadingAnalytics, setLoadingAnalytics] =
    useState(true);


  useEffect(() => {

    async function loadDashboard() {

      try {

        // -----------------------------
        // Backend Health
        // -----------------------------

        const health = await getHealth();

        setBackendStatus(health.status);


        // -----------------------------
        // Analytics
        // -----------------------------

        const response = await fetch(
          `${API_URL}/analytics/`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load analytics."
          );
        }

        const data = await response.json();

        console.log("ANALYTICS:", data);

        setAnalytics(data);

      } catch (error) {

        console.error(
          "DASHBOARD ERROR:",
          error
        );

      } finally {

        setLoadingAnalytics(false);

      }

    }

    loadDashboard();

  }, []);


  return (

    <div className="min-h-screen bg-[#0a0e14] text-[#dfe2eb]">

      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <Sidebar />


      {/* ================================= */}
      {/* TOP HEADER */}
      {/* ================================= */}

      <header className="
        fixed
        top-0
        right-0
        z-30
        h-16
        w-[calc(100%-320px)]
        border-b
        border-slate-700/20
        bg-[#10141a]/80
        backdrop-blur-xl
        flex
        items-center
        justify-between
        px-6
      ">

        <div className="
          text-xl
          font-bold
          text-cyan-400
        ">
          GeoVision AI
        </div>


        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search coordinates..."
              className="
                w-64
                rounded-full
                border
                border-slate-600/30
                bg-slate-700/60
                py-2
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-400
                focus:border-cyan-400
                focus:ring-1
                focus:ring-cyan-400
              "
            />

          </div>


          <button className="
            rounded-full
            p-2
            text-slate-400
            hover:bg-slate-800
            hover:text-cyan-400
          ">
            <Bell size={20} />
          </button>


          <button className="
            rounded-full
            p-2
            text-slate-400
            hover:bg-slate-800
            hover:text-cyan-400
          ">
            <HelpCircle size={20} />
          </button>

        </div>

      </header>


      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

     <main className="
  relative
  ml-80
  min-h-screen
  overflow-hidden
  px-6
  pb-10
  pt-24
">
  {/* Earth / Satellite Background */}
<div
  className="
    absolute
    inset-0
    bg-cover
    bg-center
    bg-no-repeat
    opacity-[0.12]
  "
  style={{
    backgroundImage:
      "url('https://geovision-ai-f3h3.onrender.com/uploads/earth.jpg')",
  }}
/>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-slate-950/70" />


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="
          mb-6
          flex
          items-end
          justify-between
        ">

          <div>

            <p className="
              mb-1
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              Welcome to GeoVision AI
            </p>

            <h1 className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            ">
              Mission Control Dashboard
            </h1>

          </div>


          {/* Backend Status */}

          <div className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-400/30
            bg-cyan-400/10
            px-4
            py-2
          ">

            <span className="
              h-2
              w-2
              rounded-full
              bg-cyan-400
              shadow-[0_0_8px_rgba(0,219,231,0.8)]
            " />

            <span className="
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-cyan-400
            ">
              Backend {backendStatus}
            </span>

          </div>

        </div>


        {/* ================================= */}
        {/* ANALYTICS */}
        {/* ================================= */}

        {!loadingAnalytics && analytics && (

          <>

            {/* KPI CARDS */}

            <AnalyticsStats
              data={analytics}
            />


            {/* ================================= */}
            {/* BENTO GRID */}
            {/* ================================= */}

            <div className="
              mt-6
              grid
              grid-cols-12
              gap-6
            ">


              {/* ============================= */}
              {/* TREND */}
              {/* ============================= */}

              <div className="
                col-span-12
                lg:col-span-8
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-6
                backdrop-blur-md
              ">

                <div className="
                  mb-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                ">
                  Analysis Trend
                </div>

                <AnalysisTrendChart
                  data={analytics}
                />

              </div>


              {/* ============================= */}
              {/* BREAKDOWN */}
              {/* ============================= */}

              <div className="
                col-span-12
                lg:col-span-4
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-6
                backdrop-blur-md
              ">

                <div className="
                  mb-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                ">
                  Analysis Breakdown
                </div>

                <AnalysisChart
                  data={analytics}
                />

              </div>

{/* ============================= */}
{/* RECENT ANALYSES */}
{/* ============================= */}

<div
  className="
    col-span-12
    lg:col-span-8
    rounded-xl
    border
    border-slate-800
    bg-slate-900/80
    p-6
    shadow-lg
  "
>
  <div className="mb-4 flex items-center justify-between">
    <span
      className="
        font-mono
        text-xs
        font-bold
        uppercase
        tracking-[0.15em]
        text-slate-400
      "
    >
      Recent Analyses
    </span>

    <Link
      to="/history"
      className="
        font-mono
        text-xs
        font-bold
        uppercase
        text-cyan-400
        transition
        hover:text-cyan-300
      "
    >
      View All
    </Link>
  </div>

  <RecentAnalyses />
</div>


{/* ============================= */}
{/* SYSTEM LOG */}
{/* ============================= */}
              <div className="
                col-span-12
                lg:col-span-4
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-6
                backdrop-blur-md
              ">

                <div className="
                  mb-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                ">
                  System Log
                </div>


                <div className="
                  space-y-3
                  font-mono
                  text-xs
                  text-slate-400
                ">

                  <div>
                    <span className="text-emerald-400">
                      [SYS]
                    </span>{" "}
                    Analytics pipeline online
                  </div>

                  <div>
                    <span className="text-cyan-400">
                      [AI]
                    </span>{" "}
                    Change detection model ready
                  </div>

                  <div>
                    <span className="text-slate-300">
                      [REQ]
                    </span>{" "}
                    Analysis database connected
                  </div>

                  <div>
                    <span className="text-emerald-400">
                      [SYS]
                    </span>{" "}
                    Backend API responding
                  </div>

                  {analytics && (
                    <div>
                      <span className="text-cyan-400">
                        [DATA]
                      </span>{" "}
                      {analytics.total_analyses} analyses loaded
                    </div>
                  )}

                </div>

              </div>

            </div>

          </>

        )}


        {/* Loading */}

        {loadingAnalytics && (

          <div className="
            mt-10
            text-center
            font-mono
            text-sm
            text-slate-400
          ">
            Loading analytics...
          </div>

        )}

      </main>

    </div>

  );

};


/* ================================= */
/* RECENT ANALYSES */
/* ================================= */

const RecentAnalyses = () => {

  const [history, setHistory] = useState([]);


  useEffect(() => {

    async function loadHistory() {

      try {

        const response = await fetch(
          `${API_URL}/history/`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setHistory(data.slice(0, 3));

      } catch (error) {

        console.error(
          "RECENT HISTORY ERROR:",
          error
        );

      }

    }

    loadHistory();

  }, []);


  if (history.length === 0) {

    return (
      <p className="font-mono text-sm text-slate-500">
        No recent analyses available.
      </p>
    );

  }


  return (

    <div className="overflow-x-auto">

      <table className="
        w-full
        text-left
        font-mono
        text-xs
      ">

        <thead>

          <tr className="
            border-b
            border-slate-700/30
            text-slate-400
          ">

            <th className="pb-3 font-normal">
              ID
            </th>

            <th className="pb-3 font-normal">
              Date
            </th>

            <th className="pb-3 font-normal">
              Status
            </th>

            <th className="pb-3 font-normal">
              Area
            </th>

            <th className="pb-3 text-right font-normal">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {history.map((item) => (

            <tr
              key={item.id}
              className="
                border-b
                border-slate-700/20
                text-slate-300
                hover:bg-slate-800/30
              "
            >

              <td className="py-3">
                ANL-{String(item.id).padStart(4, "0")}
              </td>

              <td className="py-3">
                {new Date(
                  item.created_at
                ).toLocaleDateString()}
              </td>

              <td className="py-3">

                <span
                  className={
                    item.status === "Change Detected"
                      ? "rounded border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-emerald-400"
                      : "rounded border border-slate-600 bg-slate-700/50 px-2 py-1 text-slate-300"
                  }
                >
                  {item.status}
                </span>

              </td>

              <td className="py-3">
                {item.changed_area_percentage}%
              </td>

              <td className="py-3 text-right">

               <Link
  to={`/history/${item.id}`}
  className="
    rounded
    border
    border-cyan-400
    px-3
    py-1
    text-cyan-400
    hover:bg-cyan-400/10
    transition
  "
>
  VIEW
</Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};


export default Dashboard;