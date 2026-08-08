import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const ActionButtons = ({
  downloadResult,
  handleReset,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-6">

      <button
        onClick={downloadResult}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition"
      >
        <ArrowDownTrayIcon className="w-6 h-6" />
        Download
      </button>

      <button
        onClick={handleReset}
        className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl transition"
      >
        <ArrowPathIcon className="w-6 h-6" />
        Compare Again
      </button>

    </div>
  );
};

export default ActionButtons;