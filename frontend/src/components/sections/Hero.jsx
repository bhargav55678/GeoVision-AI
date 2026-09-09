import { motion } from "framer-motion";
import SpaceBackground from "../common/SpaceBackground";
import EarthScene from "../three/EarthScene";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#020817] text-white">

      {/* ============================= */}
      {/* SPACE BACKGROUND */}
      {/* ============================= */}

      <SpaceBackground />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[45%] top-[35%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />


      {/* ============================= */}
      {/* MAIN HERO */}
      {/* ============================= */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-70px)] max-w-[1450px] items-center px-6 py-16 lg:px-12">

        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">


          {/* ================================= */}
          {/* LEFT CONTENT */}
          {/* ================================= */}

          <div className="max-w-2xl">

            {/* Small heading */}

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="
                mb-5
                font-mono
                text-sm
                font-semibold
                uppercase
                tracking-[0.3em]
                text-cyan-400
              "
            >
              AI-POWERED GEOSPATIAL INTELLIGENCE
            </motion.p>


            {/* Main heading */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                text-5xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                sm:text-6xl
                lg:text-7xl
              "
            >
              See Earth.
              <br />

              <span className="text-white">
                Understand
              </span>{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-300
                  via-cyan-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Change.
              </span>
            </motion.h1>


            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-slate-400
                sm:text-lg
              "
            >
              Detect environmental changes using satellite imagery,
              computer vision and artificial intelligence.
              Transform complex geospatial data into actionable
              intelligence.
            </motion.p>


            {/* ============================= */}
            {/* BUTTONS */}
            {/* ============================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="mt-8 flex flex-wrap gap-4"
            >

              <button
                onClick={() => navigate("/analysis")}
                className="
                  rounded-lg
                  bg-cyan-400
                  px-7
                  py-3.5
                  font-semibold
                  text-slate-950
                  shadow-[0_0_25px_rgba(34,211,238,0.25)]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-cyan-300
                  hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]
                "
              >
                🚀 Launch Mission
              </button>


              <button
                onClick={() => navigate("/dashboard")}
                className="
                  rounded-lg
                  border
                  border-cyan-500/60
                  bg-slate-950/40
                  px-7
                  py-3.5
                  font-semibold
                  text-cyan-300
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-cyan-400
                  hover:bg-cyan-400/10
                "
              >
                📊 View Dashboard
              </button>

            </motion.div>


            {/* ============================= */}
            {/* MISSION METRICS */}
            {/* ============================= */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
              className="
                mt-10
                grid
                max-w-2xl
                grid-cols-2
                overflow-hidden
                rounded-xl
                border
                border-cyan-500/20
                bg-slate-950/50
                backdrop-blur-md
                sm:grid-cols-4
              "
            >

              {/* Metric 1 */}

              <div className="border-b border-cyan-500/10 p-4 sm:border-b-0 sm:border-r">

                <p className="text-2xl font-bold text-white">
                  1,248+
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Images Analyzed
                </p>

              </div>


              {/* Metric 2 */}

              <div className="border-b border-cyan-500/10 p-4 sm:border-b-0 sm:border-r">

                <p className="text-2xl font-bold text-white">
                  89+
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Regions Monitored
                </p>

              </div>


              {/* Metric 3 */}

              <div className="border-r border-cyan-500/10 p-4">

                <p className="text-2xl font-bold text-cyan-400">
                  92.4%
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Detection Accuracy
                </p>

              </div>


              {/* Metric 4 */}

              <div className="p-4">

                <p className="text-2xl font-bold text-emerald-400">
                  24/7
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  System Uptime
                </p>

              </div>

            </motion.div>

          </div>


          {/* ================================= */}
          {/* EARTH + SATELLITE */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
            }}
            className="
              relative
              flex
              min-h-[500px]
              items-center
              justify-center
              lg:min-h-[650px]
            "
          >

            {/* Outer glow */}

            <div
              className="
                pointer-events-none
                absolute
                h-[420px]
                w-[420px]
                rounded-full
                bg-cyan-400/10
                blur-[80px]
              "
            />


            {/* Orbit ring 1 */}

            <div
              className="
                pointer-events-none
                absolute
                h-[500px]
                w-[500px]
                rounded-full
                border
                border-cyan-400/20
                rotate-[18deg]
              "
            />


            {/* Orbit ring 2 */}

            <div
              className="
                pointer-events-none
                absolute
                h-[430px]
                w-[560px]
                rounded-[50%]
                border
                border-cyan-400/15
                rotate-[-25deg]
              "
            />


            {/* ================================= */}
            {/* SATELLITE ORBIT */}
            {/* ================================= */}

            <div
              className="
                pointer-events-none
                absolute
                h-[530px]
                w-[530px]
                animate-[spin_14s_linear_infinite]
                rounded-full
              "
            >

              {/* Satellite */}

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  -translate-x-1/2
                  -translate-y-1/2
                "
              >

                <div className="relative">

                  {/* Satellite body */}

                  <div
                    className="
                      h-7
                      w-12
                      rounded-md
                      border
                      border-cyan-200/60
                      bg-slate-700
                      shadow-[0_0_20px_rgba(34,211,238,0.6)]
                    "
                  >

                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-3
                        w-5
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-sm
                        bg-cyan-300
                      "
                    />

                  </div>


                  {/* Left solar panel */}

                  <div
                    className="
                      absolute
                      right-full
                      top-1/2
                      h-5
                      w-10
                      -translate-y-1/2
                      border
                      border-cyan-400/60
                      bg-blue-900/70
                    "
                  />


                  {/* Right solar panel */}

                  <div
                    className="
                      absolute
                      left-full
                      top-1/2
                      h-5
                      w-10
                      -translate-y-1/2
                      border
                      border-cyan-400/60
                      bg-blue-900/70
                    "
                  />

                </div>

              </div>

            </div>


            {/* ================================= */}
            {/* EARTH */}
            {/* ================================= */}

            <div className="relative z-10">

              <EarthScene />

            </div>


            {/* Scanning points */}

            <div
              className="
                absolute
                right-[8%]
                top-[25%]
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-300
                shadow-[0_0_15px_rgba(34,211,238,1)]
              "
            />

            <div
              className="
                absolute
                bottom-[23%]
                left-[10%]
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-300
                shadow-[0_0_15px_rgba(34,211,238,1)]
              "
            />

          </motion.div>

        </div>

      </div>


      {/* Bottom fade */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-32
          w-full
          bg-gradient-to-t
          from-[#020817]
          to-transparent
        "
      />

    </section>
  );
};

export default Hero;