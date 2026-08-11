const AnalysisResultStats = ({ result }) => {
  if (!result) {
    return null;
  }

  const status =
    result.changed_regions > 0
      ? "Change Detected"
      : "No Change";

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">

      <h3 className="text-2xl font-bold text-white mb-6">
        Analysis Statistics
      </h3>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Changed Regions */}

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">
            Changed Regions
          </p>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {result.changed_regions}
          </p>

        </div>


        {/* Changed Area */}

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">
            Changed Area
          </p>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {result.changed_area_percentage}%
          </p>

        </div>


        {/* Confidence */}

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">
            Confidence
          </p>

          <p className="text-3xl font-bold text-emerald-400 mt-2">
            {result.confidence}%
          </p>

        </div>


        {/* Status */}

        <div className="bg-slate-800 rounded-lg p-5">

          <p className="text-slate-400 text-sm">
            Status
          </p>

          <p
            className={`text-xl font-bold mt-3 ${
              result.changed_regions > 0
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {status}
          </p>

        </div>

      </div>

    </div>
  );
};


export default AnalysisResultStats;