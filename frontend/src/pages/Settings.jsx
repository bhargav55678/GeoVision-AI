import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  Server,
  Activity,
  Database,
  Info,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

const API_URL = "http://127.0.0.1:8000";

const Settings = () => {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [checking, setChecking] = useState(false);

  const [sensitivity, setSensitivity] = useState(70);
  const [confidence, setConfidence] = useState(80);

  const [saved, setSaved] = useState(false);

  // =========================================
  // CHECK BACKEND
  // =========================================

  const checkBackend = async () => {
    try {
      setChecking(true);
      setBackendStatus("Checking...");

      const response = await fetch(`${API_URL}/health`);

      if (!response.ok) {
        throw new Error("Backend unavailable");
      }

      const data = await response.json();

      setBackendStatus(
        String(data.status || "online").toLowerCase()
      );
    } catch (error) {
      console.error("SETTINGS HEALTH ERROR:", error);
      setBackendStatus("offline");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  // =========================================
  // SAVE SETTINGS
  // =========================================

  const handleSave = () => {
    localStorage.setItem(
      "geovision_settings",
      JSON.stringify({
        sensitivity,
        confidence,
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // =========================================
  // LOAD SETTINGS
  // =========================================

  useEffect(() => {
    const stored = localStorage.getItem("geovision_settings");

    if (stored) {
      try {
        const data = JSON.parse(stored);

        if (data.sensitivity !== undefined) {
          setSensitivity(data.sensitivity);
        }

        if (data.confidence !== undefined) {
          setConfidence(data.confidence);
        }
      } catch (error) {
        console.error("SETTINGS LOAD ERROR:", error);
      }
    }
  }, []);

  // =========================================
  // RESET SETTINGS
  // =========================================

  const handleReset = () => {
    setSensitivity(70);
    setConfidence(80);

    localStorage.removeItem("geovision_settings");

    setSaved(false);
  };

  const isOnline = backendStatus === "online";

  return (
    <div className="min-h-screen bg-[#10141a] text-[#dfe2eb]">

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

      <Sidebar />

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <main className="ml-[320px] min-h-screen">

        {/* HEADER */}

        <header className="h-16 border-b border-[#3a494b]/40 flex items-center px-8">

          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[#00dbe7]">
              GEOVISION AI
            </p>

            <p className="text-xs text-[#849495] mt-1">
              MISSION CONTROL / SETTINGS
            </p>
          </div>

        </header>

        {/* CONTENT */}

        <div className="px-8 py-10 max-w-[1400px]">

          {/* ========================================= */}
          {/* PAGE TITLE */}
          {/* ========================================= */}

          <div className="mb-10">

            <div className="flex items-center gap-3">

              <SettingsIcon
                size={30}
                className="text-[#00dbe7]"
              />

              <h1 className="font-['Space_Grotesk'] text-4xl font-semibold">
                System Settings
              </h1>

            </div>

            <p className="mt-3 text-[#849495]">
              Configure GeoVision AI analysis and monitor system connectivity.
            </p>

          </div>

          {/* ========================================= */}
          {/* SYSTEM STATUS */}
          {/* ========================================= */}

          <section className="bg-[#181c22]/80 backdrop-blur-md border border-[#3a494b] rounded-2xl p-6 mb-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-[#00dbe7]/10 flex items-center justify-center">

                  <Activity
                    size={24}
                    className="text-[#00dbe7]"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-semibold">
                    System Status
                  </h2>

                  <p className="text-sm text-[#849495] mt-1">
                    GeoVision AI backend connection
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline
                      ? "bg-[#4edea3] shadow-[0_0_12px_#4edea3]"
                      : backendStatus === "Checking..."
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-red-400"
                  }`}
                />

                <span
                  className={`font-mono text-sm uppercase tracking-wider ${
                    isOnline
                      ? "text-[#4edea3]"
                      : backendStatus === "Checking..."
                      ? "text-yellow-400"
                      : "text-red-400"
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
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-[#00dbe7]
                px-5
                py-3
                font-mono
                text-xs
                font-bold
                tracking-widest
                text-[#00dbe7]
                transition
                hover:bg-[#00dbe7]
                hover:text-[#00363a]
                disabled:opacity-50
              "
            >

              <RefreshCw
                size={16}
                className={checking ? "animate-spin" : ""}
              />

              {checking ? "CHECKING..." : "CHECK CONNECTION"}

            </button>

          </section>

          {/* ========================================= */}
          {/* ANALYSIS SETTINGS */}
          {/* ========================================= */}

          <section className="bg-[#181c22]/80 backdrop-blur-md border border-[#3a494b] rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-12 h-12 rounded-xl bg-[#00dbe7]/10 flex items-center justify-center">

                <SlidersHorizontal
                  size={24}
                  className="text-[#00dbe7]"
                />

              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  AI Detection Settings
                </h2>

                <p className="text-sm text-[#849495] mt-1">
                  Control image comparison sensitivity.
                </p>

              </div>

            </div>

            {/* SENSITIVITY */}

            <div className="mb-8">

              <div className="flex justify-between mb-3">

                <label className="font-mono text-xs tracking-wider text-[#b9cacb]">
                  DETECTION SENSITIVITY
                </label>

                <span className="font-mono text-sm text-[#00dbe7]">
                  {sensitivity}%
                </span>

              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) =>
                  setSensitivity(Number(e.target.value))
                }
                className="w-full accent-[#00dbe7]"
              />

              <div className="flex justify-between mt-2 text-xs text-[#849495] font-mono">
                <span>LOW</span>
                <span>HIGH</span>
              </div>

            </div>

            {/* CONFIDENCE */}

            <div>

              <div className="flex justify-between mb-3">

                <label className="font-mono text-xs tracking-wider text-[#b9cacb]">
                  CONFIDENCE THRESHOLD
                </label>

                <span className="font-mono text-sm text-[#4edea3]">
                  {confidence}%
                </span>

              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) =>
                  setConfidence(Number(e.target.value))
                }
                className="w-full accent-[#4edea3]"
              />

              <div className="flex justify-between mt-2 text-xs text-[#849495] font-mono">
                <span>LOW</span>
                <span>STRICT</span>
              </div>

            </div>

            {/* SAVE / RESET */}

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#3a494b]/50">

              <button
                onClick={handleSave}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#00dbe7]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-[#00363a]
                  transition
                  hover:bg-[#74f5ff]
                "
              >

                <CheckCircle2 size={17} />

                SAVE SETTINGS

              </button>

              <button
                onClick={handleReset}
                className="
                  rounded-lg
                  border
                  border-[#3a494b]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#b9cacb]
                  transition
                  hover:border-[#00dbe7]
                  hover:text-[#00dbe7]
                "
              >
                RESET
              </button>

              {saved && (
                <span className="flex items-center gap-2 text-sm text-[#4edea3]">

                  <CheckCircle2 size={17} />

                  Settings saved

                </span>
              )}

            </div>

          </section>

          {/* ========================================= */}
          {/* BACKEND CONNECTION */}
          {/* ========================================= */}

          <section className="bg-[#181c22]/80 backdrop-blur-md border border-[#3a494b] rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

                <Server
                  size={24}
                  className="text-purple-400"
                />

              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Backend Connection
                </h2>

                <p className="text-sm text-[#849495] mt-1">
                  Current GeoVision AI API configuration
                </p>

              </div>

            </div>

            <div>

              <p className="font-mono text-xs tracking-wider text-[#849495] mb-2">
                API ENDPOINT
              </p>

              <div className="bg-[#0a0e14] border border-[#3a494b] rounded-lg px-4 py-4 font-mono text-sm text-[#00dbe7]">
                {API_URL}
              </div>

            </div>

          </section>

          {/* ========================================= */}
          {/* DATABASE */}
          {/* ========================================= */}

          <section className="bg-[#181c22]/80 backdrop-blur-md border border-[#3a494b] rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#4edea3]/10 flex items-center justify-center">

                <Database
                  size={24}
                  className="text-[#4edea3]"
                />

              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Data Storage
                </h2>

                <p className="text-sm text-[#849495] mt-1">
                  Analysis records are managed by the backend database.
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-3 bg-[#0a0e14] border border-[#3a494b] rounded-lg px-4 py-4">

              <ShieldCheck
                size={20}
                className="text-[#4edea3]"
              />

              <div>

                <p className="font-mono text-xs text-[#849495]">
                  STORAGE STATUS
                </p>

                <p className="text-sm text-[#4edea3] mt-1">
                  CONNECTED THROUGH BACKEND
                </p>

              </div>

            </div>

          </section>

          {/* ========================================= */}
          {/* APPLICATION INFORMATION */}
          {/* ========================================= */}

          <section className="bg-[#181c22]/80 backdrop-blur-md border border-[#3a494b] rounded-2xl p-6">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-[#00dbe7]/10 flex items-center justify-center">

                <Info
                  size={24}
                  className="text-[#00dbe7]"
                />

              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Application Information
                </h2>

                <p className="text-sm text-[#849495] mt-1">
                  GeoVision AI platform details
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InfoCard
                label="APPLICATION"
                value="GeoVision AI"
              />

              <InfoCard
                label="VERSION"
                value="1.0.0"
              />

              <InfoCard
                label="PLATFORM"
                value="AI Satellite Change Detection"
              />

              <InfoCard
                label="API"
                value="FastAPI"
              />

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};


// =========================================
// INFO CARD
// =========================================

const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-[#0a0e14] border border-[#3a494b]/60 rounded-lg p-5">

      <p className="font-mono text-[11px] tracking-[0.15em] text-[#849495]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#dfe2eb]">
        {value}
      </p>

    </div>
  );
};

export default Settings;