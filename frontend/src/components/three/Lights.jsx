import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Lights = () => {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.15) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      <directionalLight
        ref={lightRef}
        position={[5, 3, 5]}
        intensity={2.8}
        color="#b9eaff"
      />

      <pointLight
        position={[-3, 2, 4]}
        intensity={1.5}
        color="#008cff"
      />

      <pointLight
        position={[3, -2, 2]}
        intensity={0.8}
        color="#00d9ff"
      />
    </>
  );
};

export default Lights;