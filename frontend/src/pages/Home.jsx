import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import MissionStats from "../components/sections/MissionStats";
const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <MissionStats />
    </div>
  );
};

export default Home;