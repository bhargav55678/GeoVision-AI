import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Satellite = () => {
  const satelliteRef = useRef();

  useFrame((state) => {
    if (!satelliteRef.current) return;

    const time = state.clock.getElapsedTime();

    // Orbit movement
    const radius = 3.15;
    const speed = 0.28;

    satelliteRef.current.position.x =
      Math.cos(time * speed) * radius;

    satelliteRef.current.position.z =
      Math.sin(time * speed) * radius;

    satelliteRef.current.position.y =
      Math.sin(time * speed * 0.7) * 0.45;

    // Rotate satellite slowly
    satelliteRef.current.rotation.y += 0.004;
  });

  return (
    <group ref={satelliteRef} scale={0.72}>

      {/* ================================= */}
      {/* MAIN SATELLITE BODY */}
      {/* ================================= */}

      <mesh>
        <boxGeometry args={[0.34, 0.22, 0.24]} />

        <meshStandardMaterial
          color="#d8edf5"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>


      {/* ================================= */}
      {/* DARK CENTRAL PANEL */}
      {/* ================================= */}

      <mesh position={[0, 0, 0.125]}>
        <boxGeometry args={[0.22, 0.14, 0.018]} />

        <meshStandardMaterial
          color="#102d46"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>


      {/* ================================= */}
      {/* GLOWING OBSERVATION SENSOR */}
      {/* ================================= */}

      <mesh position={[0, -0.01, 0.145]}>
        <boxGeometry args={[0.10, 0.075, 0.025]} />

        <meshBasicMaterial
          color="#19d9ff"
          transparent
          opacity={0.95}
        />
      </mesh>


      {/* ================================= */}
      {/* LEFT SOLAR PANEL */}
      {/* ================================= */}

      <group position={[-0.48, 0, 0]}>

        <mesh>
          <boxGeometry args={[0.55, 0.035, 0.25]} />

          <meshStandardMaterial
            color="#063b82"
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>

        {/* Solar panel grid */}
        {[-0.18, 0, 0.18].map((x) => (
          <mesh
            key={`left-x-${x}`}
            position={[x, 0.021, 0]}
          >
            <boxGeometry args={[0.008, 0.008, 0.25]} />

            <meshBasicMaterial color="#159bd7" />
          </mesh>
        ))}

        {[-0.08, 0.08].map((z) => (
          <mesh
            key={`left-z-${z}`}
            position={[0, 0.022, z]}
          >
            <boxGeometry args={[0.55, 0.008, 0.008]} />

            <meshBasicMaterial color="#159bd7" />
          </mesh>
        ))}

      </group>


      {/* ================================= */}
      {/* RIGHT SOLAR PANEL */}
      {/* ================================= */}

      <group position={[0.48, 0, 0]}>

        <mesh>
          <boxGeometry args={[0.55, 0.035, 0.25]} />

          <meshStandardMaterial
            color="#063b82"
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>

        {/* Solar panel grid */}
        {[-0.18, 0, 0.18].map((x) => (
          <mesh
            key={`right-x-${x}`}
            position={[x, 0.021, 0]}
          >
            <boxGeometry args={[0.008, 0.008, 0.25]} />

            <meshBasicMaterial color="#159bd7" />
          </mesh>
        ))}

        {[-0.08, 0.08].map((z) => (
          <mesh
            key={`right-z-${z}`}
            position={[0, 0.022, z]}
          >
            <boxGeometry args={[0.55, 0.008, 0.008]} />

            <meshBasicMaterial color="#159bd7" />
          </mesh>
        ))}

      </group>


      {/* ================================= */}
      {/* TOP ANTENNA ARM */}
      {/* ================================= */}

      <mesh position={[0, 0.20, 0]}>
        <cylinderGeometry
          args={[0.014, 0.014, 0.22, 12]}
        />

        <meshStandardMaterial
          color="#d8f5ff"
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>


      {/* ================================= */}
      {/* COMMUNICATION DISH */}
      {/* ================================= */}

      <mesh
        position={[0, 0.31, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <sphereGeometry
          args={[0.09, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />

        <meshStandardMaterial
          color="#bdeaf7"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>


      {/* ================================= */}
      {/* SMALL ANTENNA TIP */}
      {/* ================================= */}

      <mesh position={[0, 0.40, 0]}>
        <sphereGeometry args={[0.025, 12, 12]} />

        <meshBasicMaterial color="#20ddff" />
      </mesh>


      {/* ================================= */}
      {/* SMALL SIDE THRUSTERS */}
      {/* ================================= */}

      <mesh position={[-0.20, -0.02, 0]}>
        <cylinderGeometry
          args={[0.035, 0.035, 0.08, 12]}
        />

        <meshStandardMaterial
          color="#526b78"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0.20, -0.02, 0]}>
        <cylinderGeometry
          args={[0.035, 0.035, 0.08, 12]}
        />

        <meshStandardMaterial
          color="#526b78"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

    </group>
  );
};

export default Satellite;