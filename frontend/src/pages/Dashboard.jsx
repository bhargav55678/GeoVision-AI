import Sidebar from "../components/layout/Sidebar";

import { useEffect, useState } from "react";

import { getHealth } from "../services/api";

import AnalyticsStats from "../components/AnalyticsStats";
import AnalysisChart from "../components/AnalysisChart";
import AnalysisTrendChart from "../components/AnalysisTrendChart";


const API_URL = "http://127.0.0.1:8000";


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

        // --------------------------------
        // Backend health
        // --------------------------------

        const health = await getHealth();

        setBackendStatus(health.status);


        // --------------------------------
        // Analytics
        // --------------------------------

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

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

      <main className="flex-1 min-w-0">

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8">

          {/* -------------------------------- */}
          {/* Header */}
          {/* -------------------------------- */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome to GeoVision AI
              </h1>

              <p className="mt-2 text-slate-400">
                Mission Control Dashboard
              </p>

            </div>


            {/* Backend Status */}

            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">

              <div
                className={`w-3 h-3 rounded-full ${
                  backendStatus === "online"
                    ? "bg-green-400"
                    : "bg-yellow-400"
                }`}
              />

              <div>

                <p className="text-xs text-slate-500">
                  Backend Status
                </p>

                <p
                  className={
                    backendStatus === "online"
                      ? "text-green-400 font-semibold"
                      : "text-yellow-400 font-semibold"
                  }
                >
                  {backendStatus}
                </p>

              </div>

            </div>

          </div>


          {/* -------------------------------- */}
          {/* Analytics */}
          {/* -------------------------------- */}

          {!loadingAnalytics && analytics && (

            <>

              {/* Analytics Cards */}

              <AnalyticsStats
                data={analytics}
              />


              {/* Charts */}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                {/* Analysis Breakdown */}

                <AnalysisChart
                  data={analytics}
                />


                {/* Analysis Trend */}

                <AnalysisTrendChart
                  data={analytics}
                />

              </div>

            </>

          )}


          {/* -------------------------------- */}
          {/* Loading */}
          {/* -------------------------------- */}

          {loadingAnalytics && (

            <div className="flex items-center justify-center py-24">

              <div className="text-center">

                <div className="w-10 h-10 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto" />

                <p className="mt-4 text-slate-400">
                  Loading analytics...
                </p>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>

  );

};


export default Dashboard;