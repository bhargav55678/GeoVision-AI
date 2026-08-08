import { PhotoIcon } from "@heroicons/react/24/solid";

const ComparisonResult = ({ result }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">

      <div className="flex items-center gap-3 mb-5">

        <PhotoIcon className="w-8 h-8 text-cyan-400" />

        <h2 className="text-2xl font-bold">
          Comparison Result
        </h2>

      </div>

      <img
        src={`http://127.0.0.1:8000/${result.comparison_image.replace(/\\/g, "/")}`}
        alt="Comparison Result"
        className="w-full rounded-xl border-2 border-red-500"
      />

    </div>
  );
};

export default ComparisonResult;