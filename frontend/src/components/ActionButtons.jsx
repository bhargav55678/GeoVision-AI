import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const ActionButtons = ({
  downloadResult,
  handleReset,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

      {/* ============================= */}
      {/* DOWNLOAD */}
      {/* ============================= */}

      <button
        onClick={downloadResult}
        className="
          group
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-emerald-400/40
          bg-emerald-500/10
          px-6
          py-4
          text-sm
          font-bold
          uppercase
          tracking-wider
          text-emerald-300
          transition-all
          duration-200
          hover:border-emerald-300
          hover:bg-emerald-500/20
          hover:text-emerald-200
          hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]
        "
      >
        <ArrowDownTrayIcon
          className="
            w-6
            h-6
            transition-transform
            group-hover:-translate-y-1
          "
        />

        Download
      </button>


      {/* ============================= */}
      {/* COMPARE AGAIN */}
      {/* ============================= */}

      <button
        onClick={handleReset}
        className="
          group
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-cyan-400/50
          bg-cyan-500/10
          px-6
          py-4
          text-sm
          font-bold
          uppercase
          tracking-wider
          text-cyan-300
          transition-all
          duration-200
          hover:border-cyan-300
          hover:bg-cyan-500/20
          hover:text-cyan-200
          hover:shadow-[0_0_25px_rgba(34,211,238,0.18)]
        "
      >
        <ArrowPathIcon
          className="
            w-6
            h-6
            transition-transform
            duration-300
            group-hover:rotate-180
          "
        />

        Compare Again
      </button>

    </div>
  );
};

export default ActionButtons;