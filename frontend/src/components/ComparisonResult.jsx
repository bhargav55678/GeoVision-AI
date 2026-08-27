import { PhotoIcon } from "@heroicons/react/24/outline";

const ComparisonResult = ({ result }) => {
  if (!result) {
    return null;
  }

  const imagePath = result.comparison_image.replace(
    /\\/g,
    "/"
  );

  const imageUrl =
    `http://127.0.0.1:8000/${imagePath}`;

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

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <PhotoIcon
            className="
              h-6
              w-6
              text-cyan-400
            "
          />

          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-200
            "
          >
            Comparison Result
          </span>

        </div>


        {/* AI STATUS */}

        <span
          className="
            rounded
            border
            border-cyan-400/30
            bg-cyan-400/10
            px-3
            py-1
            font-mono
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            text-cyan-400
            shadow-[0_0_15px_rgba(34,211,238,0.08)]
          "
        >
          AI DETECTED
        </span>

      </div>


      {/* ================================= */}
      {/* IMAGE VIEWPORT */}
      {/* ================================= */}

      <div
        className="
          relative
          flex
          min-h-[520px]
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          border
          border-cyan-400/20
          bg-[#050914]
        "
      >

        {/* ================================= */}
        {/* IMAGE */}
        {/* ================================= */}

        <img
          src={imageUrl}
          alt="Comparison Result"
          className="
            block
            max-h-[520px]
            max-w-full
            object-contain
          "
        />


        {/* ================================= */}
        {/* HUD CORNERS */}
        {/* ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-3
            top-3
            h-7
            w-7
            border-l
            border-t
            border-cyan-400
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-3
            top-3
            h-7
            w-7
            border-r
            border-t
            border-cyan-400/60
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            left-3
            h-7
            w-7
            border-b
            border-l
            border-cyan-400/60
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            right-3
            h-7
            w-7
            border-b
            border-r
            border-cyan-400
          "
        />


        {/* ================================= */}
        {/* TOP LEFT DATA LABEL */}
        {/* ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-5
            top-5
            rounded
            border
            border-cyan-400/20
            bg-black/60
            px-3
            py-1
            font-mono
            text-[10px]
            uppercase
            tracking-wider
            text-cyan-400
            backdrop-blur-sm
          "
        >
          AI ANALYSIS OUTPUT
        </div>


        {/* ================================= */}
        {/* BOTTOM RIGHT LABEL */}
        {/* ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-5
            right-5
            font-mono
            text-[10px]
            uppercase
            tracking-wider
            text-cyan-400
          "
        >
          GEO-VISION / AI
        </div>

      </div>


      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
        "
      >

        <span
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          Comparison Output
        </span>

        <span
          className="
            font-mono
            text-[11px]
            text-cyan-400
          "
        >
          DETECTION COMPLETE
        </span>

      </div>

    </div>
  );
};

export default ComparisonResult;