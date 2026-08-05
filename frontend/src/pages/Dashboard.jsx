import Sidebar from "../components/layout/Sidebar";
import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
const Dashboard = () => {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  useEffect(() => {
  async function checkBackend() {
    const data = await getHealth();
    setBackendStatus(data.status);
  }

  checkBackend();
}, []);
  return (
    <div className="flex bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          Welcome to GeoVision AI
        </h1>

        <p className="mt-4 text-slate-400">
          Mission Control Dashboard
        </p>

        <h2 className="text-2xl font-bold text-cyan-400">
  Backend Status: {backendStatus}
</h2>

      </main>

    </div>
  );
};

export default Dashboard;