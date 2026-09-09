import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const lightsRef = useRef();

  const [textures, setTextures] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    Promise.all([
      new Promise((resolve) =>
        loader.load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
          resolve
        )
      ),

      new Promise((resolve) =>
        loader.load(
          "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
          resolve
        )
      ),

      new Promise((resolve) =>
        loader.load(
          "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
          resolve
        )
      ),

      new Promise((resolve) =>
        loader.load(
          "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
          resolve
        )
      ),
    ]).then(([map, normalMap, specularMap, lightsMap]) => {
      setTextures({
        map,
        normalMap,
        specularMap,
        lightsMap,
      });
    });
  }, []);

  useFrame((state, delta) => {
    // Earth rotation
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }

    // City lights rotate with Earth
    if (lightsRef.current) {
      lightsRef.current.rotation.y += delta * 0.12;
    }

    // Atmosphere slowly follows Earth
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.04;
    }
  });

  if (!textures) {
    return (
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#087ea4" />
      </mesh>
    );
  }

  return (
    <group>

      {/* ============================== */}
      {/* EARTH */}
      {/* ============================== */}

      <mesh ref={earthRef}>

        <sphereGeometry args={[2, 64, 64]} />

        <meshPhongMaterial
          map={textures.map}
          normalMap={textures.normalMap}
          specularMap={textures.specularMap}
          specular={new THREE.Color("#2c9ed6")}
          shininess={18}
        />

      </mesh>


      {/* ============================== */}
      {/* CITY LIGHTS */}
      {/* ============================== */}

      <mesh ref={lightsRef}>

        <sphereGeometry args={[2.012, 64, 64]} />

        <meshBasicMaterial
          map={textures.lightsMap}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />

      </mesh>


      {/* ============================== */}
      {/* ATMOSPHERE */}
      {/* ============================== */}

      <mesh ref={atmosphereRef}>

        <sphereGeometry args={[2.08, 64, 64]} />

        <meshBasicMaterial
          color="#18bfff"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />

      </mesh>


      {/* Outer atmospheric glow */}

      <mesh>

        <sphereGeometry args={[2.16, 64, 64]} />

        <meshBasicMaterial
          color="#008cff"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />

      </mesh>

    </group>
  );
};

export default Earth;