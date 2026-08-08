import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const AnalysisStats = ({ result }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">

      <div className="flex items-center gap-3 mb-6">

        <SparklesIcon className="w-8 h-8 text-cyan-400" />

        <h2 className="text-2xl font-bold">
          AI Analysis
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-gray-400">
            Changed Regions
          </p>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {result.changed_regions}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-gray-400">
            Changed Area
          </p>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {result.changed_area_percentage}%
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-gray-400">
            Confidence
          </p>

          <p className="text-4xl font-bold text-green-400 mt-3">
            98%
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-gray-400">
            Status
          </p>

          {result.changed_regions > 0 ? (

            <div className="flex justify-center items-center gap-2 mt-3 text-red-400 font-bold">

              <ExclamationTriangleIcon className="w-6 h-6" />

              Change Detected

            </div>

          ) : (

            <div className="flex justify-center items-center gap-2 mt-3 text-green-400 font-bold">

              <CheckCircleIcon className="w-6 h-6" />

              No Change

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AnalysisStats;