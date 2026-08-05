import { motion } from "framer-motion";

const EarthHero = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative flex h-[380px] w-[380px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-sm">

        <div className="absolute h-[320px] w-[320px] rounded-full border border-cyan-400/20"></div>

        <div className="absolute h-[260px] w-[260px] rounded-full border border-cyan-400/10"></div>

        <div className="absolute h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-2xl"></div>

      </div>
    </motion.div>
  );
};

export default EarthHero;