import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ReportGenerator from "../components/ReportGenerator";

const API_URL = "http://127.0.0.1:8000";

const HistoryDetails = () => {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/history/${id}`
        );

        if (!response.ok) {
          throw new Error("Analysis not found.");
        }

        const data = await response.json();

        setAnalysis(data);
      } catch (err) {
        console.error("HISTORY DETAILS ERROR:", err);
        setError("Unable to load this analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>

          <p className="text-gray-400 mt-4">
            Loading analysis...
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-red-400">
            {error}
          </h1>

          <Link
            to="/history"
            className="inline-block mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg"
          >
            Back to History
          </Link>

        </div>

      </div>
    );
  }

  const comparisonImage =
    `${API_URL}/${analysis.comparison_image.replace(
      /\\/g,
      "/"
    )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-10 py-12">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl font-bold text-cyan-400">
            Analysis #{analysis.id}
          </h1>

          <p className="text-gray-400 mt-2">
            {formatDate(analysis.created_at)}
          </p>

        </div>

        <Link
          to="/history"
          className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-lg transition"
        >
          ← Back to History
        </Link>

      </div>

      {/* Status */}

      <div className="mb-8">

        <span
          className={
            analysis.status === "Change Detected"
              ? "inline-block bg-red-500/20 text-red-400 px-5 py-3 rounded-full font-bold"
              : "inline-block bg-green-500/20 text-green-400 px-5 py-3 rounded-full font-bold"
          }
        >
          {analysis.status}
        </span>

      </div>

      {/* Main Content */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Comparison Image */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <h2 className="text-2xl font-bold mb-5">
            Comparison Result
          </h2>

          <img
            src={comparisonImage}
            alt="Comparison Result"
            className="w-full rounded-xl border-2 border-red-500"
          />

        </div>

        {/* Statistics */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <h2 className="text-2xl font-bold mb-6">
            Analysis Statistics
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-gray-400">
                Changed Regions
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-2">
                {analysis.changed_regions}
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-gray-400">
                Changed Area
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-2">
                {analysis.changed_area_percentage}%
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-gray-400">
                Confidence
              </p>

              <p className="text-4xl font-bold text-green-400 mt-2">
                {analysis.confidence}%
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-gray-400">
                Analysis ID
              </p>

              <p className="text-4xl font-bold text-purple-400 mt-2">
                #{analysis.id}
              </p>

            </div>

          </div>

          {/* File Information */}

          <div className="mt-8 space-y-3 text-gray-400">

            <p>
              <span className="text-white font-semibold">
                Before Image:
              </span>{" "}
              {analysis.before_image}
            </p>

            <p>
              <span className="text-white font-semibold">
                After Image:
              </span>{" "}
              {analysis.after_image}
            </p>

          </div>

          {/* PDF Report */}

          <div className="mt-8">

            <ReportGenerator result={analysis} />

          </div>

        </div>

      </div>

    </div>
  );
};

export default HistoryDetails;