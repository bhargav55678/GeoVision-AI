import { motion } from "framer-motion";
import {
  Satellite,
  Globe,
  Cpu,
  Activity,
} from "lucide-react";

const stats = [
  {
    icon: Satellite,
    title: "Active Satellites",
    value: "42",
  },
  {
    icon: Globe,
    title: "Countries Covered",
    value: "190+",
  },
  {
    icon: Cpu,
    title: "AI Engine",
    value: "ONLINE",
  },
  {
    icon: Activity,
    title: "Telemetry Streams",
    value: "LIVE",
  },
];

const MissionStats = () => {
  return (
    <section className="bg-slate-950 px-6 pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10"
            >
              <Icon className="mb-5 h-10 w-10 text-cyan-400" />

              <h3 className="text-slate-400">
                {item.title}
              </h3>

              <p className="mt-3 text-3xl font-bold text-white">
                {item.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MissionStats;