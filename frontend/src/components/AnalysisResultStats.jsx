const AnalysisResultStats = ({ result }) => {
  if (!result) {
    return null;
  }

  const status =
    result.changed_regions > 0
      ? "Change Detected"
      : "No Change";

  const statusColor =
    result.changed_regions > 0
      ? "text-red-400"
      : "text-emerald-400";

  const statusDot =
    result.changed_regions > 0
      ? "bg-red-400"
      : "bg-emerald-400";

  return (
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-[#111827]/80
        p-6
        backdrop-blur-md
      "
    >

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-6">

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
          Analysis Statistics
        </span>

        <p className="mt-2 text-sm text-slate-500">
          AI detection metrics from the comparison
        </p>

      </div>


      {/* ================================= */}
      {/* STATISTICS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        {/* Changed Regions */}

        <div
          className="
            rounded-lg
            border
            border-white/5
            bg-slate-950/60
            p-5
            transition
            hover:border-cyan-400/30
          "
        >

          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            Changed Regions
          </p>

          <p
            className="
              mt-3
              font-mono
              text-3xl
              font-bold
              text-cyan-400
            "
          >
            {result.changed_regions}
          </p>

        </div>


        {/* Changed Area */}

        <div
          className="
            rounded-lg
            border
            border-white/5
            bg-slate-950/60
            p-5
            transition
            hover:border-cyan-400/30
          "
        >

          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            Changed Area
          </p>

          <p
            className="
              mt-3
              font-mono
              text-3xl
              font-bold
              text-cyan-400
            "
          >
            {result.changed_area_percentage}%
          </p>

        </div>


        {/* Confidence */}

        <div
          className="
            rounded-lg
            border
            border-white/5
            bg-slate-950/60
            p-5
            transition
            hover:border-emerald-400/30
          "
        >

          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            Confidence
          </p>

          <p
            className="
              mt-3
              font-mono
              text-3xl
              font-bold
              text-emerald-400
            "
          >
            {result.confidence}%
          </p>

        </div>


        {/* Status */}

        <div
          className="
            rounded-lg
            border
            border-white/5
            bg-slate-950/60
            p-5
          "
        >

          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            Detection Status
          </p>


          <div className="mt-4 flex items-center gap-3">

            <span
              className={`
                h-3
                w-3
                rounded-full
                ${statusDot}
                shadow-[0_0_10px_currentColor]
              `}
            />

            <span
              className={`
                font-mono
                text-sm
                font-bold
                uppercase
                tracking-wide
                ${statusColor}
              `}
            >
              {status}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AnalysisResultStats;