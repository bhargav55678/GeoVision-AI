import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Earth = () => {
  const earthRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.3;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group>

      {/* Main Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#00bfff"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.03, 32, 32]} />
        <meshBasicMaterial
          color="#66ffff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

    </group>
  );
};

export default Earth;