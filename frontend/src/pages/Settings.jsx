import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  Server,
  Activity,
  Database,
  Info,
  RefreshCw,
} from "lucide-react";


const API_URL = "http://127.0.0.1:8000";


const Settings = () => {

  const [backendStatus, setBackendStatus] =
    useState("Checking...");

  const [checking, setChecking] =
    useState(false);


  const checkBackend = async () => {

    try {

      setChecking(true);

      const response = await fetch(
        `${API_URL}/health`
      );


      if (!response.ok) {
        throw new Error(
          "Backend unavailable"
        );
      }


      const data =
        await response.json();


      setBackendStatus(
        data.status || "online"
      );

    } catch (error) {

      console.error(
        "SETTINGS HEALTH ERROR:",
        error
      );

      setBackendStatus("offline");

    } finally {

      setChecking(false);

    }

  };


  useEffect(() => {

    checkBackend();

  }, []);


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <main className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">


        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <SettingsIcon
              size={32}
              className="text-cyan-400"
            />

            <h1 className="text-4xl font-bold">

              Settings

            </h1>

          </div>


          <p className="text-slate-400 mt-3">

            Manage GeoVision AI system information and connection settings

          </p>

        </div>



        {/* ================================= */}
        {/* SYSTEM STATUS */}
        {/* ================================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-6">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="bg-cyan-500/10 p-3 rounded-xl">

                <Activity
                  className="text-cyan-400"
                  size={24}
                />

              </div>


              <div>

                <h2 className="text-xl font-semibold">

                  System Status

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Current connection status of the GeoVision AI backend

                </p>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <div
                className={`w-3 h-3 rounded-full ${
                  backendStatus === "online"
                    ? "bg-green-400"
                    : backendStatus === "offline"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
              />


              <span
                className={`font-semibold ${
                  backendStatus === "online"
                    ? "text-green-400"
                    : backendStatus === "offline"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >

                {backendStatus}

              </span>

            </div>

          </div>


          <button
            onClick={checkBackend}
            disabled={checking}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              bg-cyan-500
              hover:bg-cyan-400
              disabled:bg-slate-700
              text-black
              font-bold
              px-5
              py-3
              rounded-lg
              transition
            "
          >

            <RefreshCw
              size={18}
              className={
                checking
                  ? "animate-spin"
                  : ""
              }
            />

            {checking
              ? "Checking..."
              : "Check Connection"}

          </button>

        </section>



        {/* ================================= */}
        {/* CONNECTION SETTINGS */}
        {/* ================================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-6">

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-purple-500/10 p-3 rounded-xl">

              <Server
                className="text-purple-400"
                size={24}
              />

            </div>


            <div>

              <h2 className="text-xl font-semibold">

                Backend Connection

              </h2>

              <p className="text-slate-400 text-sm mt-1">

                GeoVision AI API configuration

              </p>

            </div>

          </div>


          <div>

            <p className="text-slate-400 text-sm mb-2">

              API Endpoint

            </p>


            <div className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 font-mono text-cyan-400">

              {API_URL}

            </div>

          </div>

        </section>



        {/* ================================= */}
        {/* DATABASE */}
        {/* ================================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-6">

          <div className="flex items-center gap-4">

            <div className="bg-green-500/10 p-3 rounded-xl">

              <Database
                className="text-green-400"
                size={24}
              />

            </div>


            <div>

              <h2 className="text-xl font-semibold">

                Data Storage

              </h2>

              <p className="text-slate-400 text-sm mt-1">

                Analysis history is stored by the backend database.

              </p>

            </div>

          </div>


          <div className="mt-5 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3">

            <p className="text-sm text-slate-400">

              Storage Status

            </p>

            <p className="text-green-400 font-semibold mt-1">

              Connected through backend

            </p>

          </div>

        </section>



        {/* ================================= */}
        {/* APPLICATION INFORMATION */}
        {/* ================================= */}

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-cyan-500/10 p-3 rounded-xl">

              <Info
                className="text-cyan-400"
                size={24}
              />

            </div>


            <div>

              <h2 className="text-xl font-semibold">

                Application Information

              </h2>

              <p className="text-slate-400 text-sm mt-1">

                GeoVision AI platform details

              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-slate-950 rounded-lg p-4">

              <p className="text-slate-500 text-sm">
                Application
              </p>

              <p className="font-semibold mt-1">
                GeoVision AI
              </p>

            </div>


            <div className="bg-slate-950 rounded-lg p-4">

              <p className="text-slate-500 text-sm">
                Version
              </p>

              <p className="font-semibold mt-1">
                1.0.0
              </p>

            </div>


            <div className="bg-slate-950 rounded-lg p-4">

              <p className="text-slate-500 text-sm">
                Platform
              </p>

              <p className="font-semibold mt-1">
                AI Satellite Change Detection
              </p>

            </div>


            <div className="bg-slate-950 rounded-lg p-4">

              <p className="text-slate-500 text-sm">
                API
              </p>

              <p className="font-semibold mt-1">
                FastAPI
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>

  );

};


export default Settings;