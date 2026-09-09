import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Earth from "./Earth";
import Satellite from "./Satellite";
import Lights from "./Lights";


// =====================================================
// ORBIT RING
// =====================================================

const Orbit = ({
  rotation = [0, 0, 0],
  scale = 1,
  speed = 0.03,
}) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry args={[2.8, 0.008, 16, 128]} />

      <meshBasicMaterial
        color="#00d9ff"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
};


// =====================================================
// EARTH SCENE
// =====================================================

const EarthScene = () => {
  return (
    <div className="h-[380px] w-[380px] md:h-[520px] md:w-[520px]">

      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        dpr={[1, 2]}
      >

        {/* LIGHTING */}
        <Lights />

        {/* ONE EARTH */}
        <Earth />


        {/* ================================================= */}
        {/* ORBIT RINGS */}
        {/* ================================================= */}

        <Orbit
          rotation={[0, 0, 0]}
          scale={1}
          speed={0.03}
        />

        <Orbit
          rotation={[Math.PI / 2.5, 0, 0]}
          scale={1.02}
          speed={-0.02}
        />


        {/* ================================================= */}
        {/* MAIN OBSERVATION SATELLITE */}
        {/* ================================================= */}


        <Satellite
          speed={0.28}
          scale={0.65}
          offset={Math.PI}
          type="relay"
        />

      </Canvas>

    </div>
  );
};

export default EarthScene;