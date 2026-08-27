const ScanningOverlay = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050912]/75 backdrop-blur-sm">

      <div
        className="
          relative
          w-[520px]
          max-w-[90%]
          overflow-hidden
          rounded-xl
          border
          border-cyan-400/50
          bg-[#111827]/95
          p-10
          shadow-[0_0_40px_rgba(0,219,231,0.15)]
        "
      >

        {/* Animated scan line */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-cyan-400
            shadow-[0_0_18px_#00dbe7]
            animate-[scan_2s_linear_infinite]
          "
        />


        {/* Satellite icon */}

        <div className="flex justify-center">

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-cyan-400/40
              bg-cyan-400/10
              text-4xl
              text-cyan-400
              animate-pulse
            "
          >
            📡
          </div>

        </div>


        {/* Title */}

        <h2
          className="
            mt-6
            text-center
            font-mono
            text-2xl
            font-bold
            text-cyan-400
          "
        >
          Analyzing satellite imagery...
        </h2>


        {/* Description */}

        <p
          className="
            mt-2
            text-center
            font-mono
            text-sm
            text-slate-400
          "
        >
          Running detection models
        </p>


        {/* Progress bar */}

        <div
          className="
            mt-8
            h-2
            overflow-hidden
            rounded-full
            bg-slate-700
          "
        >

          <div
            className="
              h-full
              bg-cyan-400
              shadow-[0_0_12px_#00dbe7]
              animate-[progress_2s_ease-in-out_infinite]
            "
          />

        </div>

      </div>

    </div>
  );
};

export default ScanningOverlay;