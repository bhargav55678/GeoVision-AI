const AnalyticsStats = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

      {/* Total Analyses */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
        <p className="text-gray-400 text-sm">
          Total Analyses
        </p>

        <p className="text-4xl font-bold text-cyan-400 mt-3">
          {data.total_analyses}
        </p>
      </div>


      {/* Changes Detected */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
        <p className="text-gray-400 text-sm">
          Changes Detected
        </p>

        <p className="text-4xl font-bold text-red-400 mt-3">
          {data.changes_detected}
        </p>
      </div>


      {/* No Change */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
        <p className="text-gray-400 text-sm">
          No Change
        </p>

        <p className="text-4xl font-bold text-green-400 mt-3">
          {data.no_change}
        </p>
      </div>


      {/* Average Changed Area */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
        <p className="text-gray-400 text-sm">
          Avg. Changed Area
        </p>

        <p className="text-4xl font-bold text-purple-400 mt-3">
          {data.average_changed_area}%
        </p>
      </div>


      {/* Average Confidence */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
        <p className="text-gray-400 text-sm">
          Avg. Confidence
        </p>

        <p className="text-4xl font-bold text-emerald-400 mt-3">
          {data.average_confidence}%
        </p>
      </div>

    </div>
  );
};

export default AnalyticsStats;