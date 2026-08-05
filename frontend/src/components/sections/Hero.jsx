import { motion } from "framer-motion";
import SpaceBackground from "../common/SpaceBackground";
import EarthScene from "../three/EarthScene";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-center">
      
      {/* Background Effects */}
      <SpaceBackground />

      <div className="absolute h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold md:text-8xl bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-transparent"
        >
          GeoVision AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-3xl text-xl text-cyan-400 md:text-2xl"
        >
          AI-Powered Geospatial Intelligence Platform
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 max-w-2xl text-slate-400"
        >
          Detect environmental changes using satellite imagery,
          computer vision and artificial intelligence.
        </motion.p>

        {/* 3D Earth */}
        <div className="my-10 flex justify-center">
          <EarthScene />
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6"
        >
         <button
  onClick={() => navigate("/dashboard")}
  className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition duration-300 hover:scale-105 hover:bg-cyan-400"
>
  Launch Mission
</button>
          <button className="rounded-xl border border-cyan-500 px-8 py-4 text-cyan-400 transition duration-300 hover:scale-105 hover:bg-cyan-500/10">
            View Dashboard
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;