import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import Lights from "./Lights";

const EarthScene = () => {
  return (
    <div className="h-[300px] w-[300px] md:h-[380px] md:w-[380px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Lights />
        <Earth />
      </Canvas>
    </div>
  );
};

export default EarthScene;