import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/history/`);

      if (!response.ok) {
        throw new Error("Failed to load analysis history.");
      }

      const data = await response.json();

      setHistory(data);
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

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-10 py-12">

      {/* Header */}

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold text-cyan-400">
          Analysis History
        </h1>

        <p className="text-gray-400 mt-3">
          View your previous satellite image comparisons
        </p>

      </div>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center items-center py-20">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>

        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-xl p-6 text-center">

          <p className="text-lg">
            {error}
          </p>

          <button
            onClick={fetchHistory}
            className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg"
          >
            Try Again
          </button>

        </div>
      )}

      {/* Empty History */}

      {!loading && !error && history.length === 0 && (
        <div className="bg-slate-900 rounded-xl p-12 text-center shadow-lg">

          <h2 className="text-2xl font-semibold mb-3">
            No Analysis History
          </h2>

          <p className="text-gray-400">
            Your completed image comparisons will appear here.
          </p>

        </div>
      )}

      {/* History Cards */}

      {!loading && !error && history.length > 0 && (

        <div className="space-y-6">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800 hover:border-cyan-500/50 transition"
            >

              <div className="flex flex-col lg:flex-row gap-6">

                {/* Comparison Image */}

                <div className="lg:w-1/3">

                  <img
                    src={`${API_URL}/${item.comparison_image.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Comparison Result"
                    className="w-full rounded-lg border border-slate-700"
                  />

                </div>

                {/* Information */}

                <div className="flex-1">

                  <div className="flex justify-between items-start mb-5">

                    <div>

                      <h2 className="text-2xl font-bold">
                        Analysis #{item.id}
                      </h2>

                      <p className="text-gray-400 text-sm mt-1">
                        {formatDate(item.created_at)}
                      </p>

                    </div>

                    <span
                      className={
                        item.status === "Change Detected"
                          ? "bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-semibold"
                          : "bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold"
                      }
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Changed Regions
                      </p>

                      <p className="text-2xl font-bold text-cyan-400 mt-1">
                        {item.changed_regions}
                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Changed Area
                      </p>

                      <p className="text-2xl font-bold text-cyan-400 mt-1">
                        {item.changed_area_percentage}%
                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Confidence
                      </p>

                      <p className="text-2xl font-bold text-green-400 mt-1">
                        {item.confidence}%
                      </p>

                    </div>

                  </div>

                  {/* Image Names */}

                  <div className="mt-5 text-sm text-gray-400">

                    <p>
                      <span className="text-white font-semibold">
                        Before:
                      </span>{" "}
                      {item.before_image}
                    </p>

                    <p className="mt-1">

                      <span className="text-white font-semibold">
                        After:
                      </span>{" "}
                      {item.after_image}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default History;