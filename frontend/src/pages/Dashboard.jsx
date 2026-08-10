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

      <main className="flex-1 p-10">

        {/* Header */}

        <h1 className="text-4xl font-bold">

          Welcome to GeoVision AI

        </h1>


        <p className="mt-4 text-slate-400">

          Mission Control Dashboard

        </p>


        {/* Backend Status */}

        <div className="mt-6">

          <span className="text-slate-400">

            Backend Status:

          </span>{" "}

          <span
            className={
              backendStatus === "online"
                ? "text-green-400 font-bold"
                : "text-yellow-400 font-bold"
            }
          >

            {backendStatus}

          </span>

        </div>


        {/* Analytics */}

        {!loadingAnalytics && analytics && (

          <>

            {/* Analytics Cards */}

            <AnalyticsStats
              data={analytics}
            />


            {/* Analysis Breakdown */}

            <AnalysisChart
              data={analytics}
            />


            {/* Analysis Trend */}

            <AnalysisTrendChart
              data={analytics}
            />

          </>

        )}


        {/* Loading */}

        {loadingAnalytics && (

          <div className="mt-10 text-gray-400">

            Loading analytics...

          </div>

        )}

      </main>

    </div>

  );

};


export default Dashboard;