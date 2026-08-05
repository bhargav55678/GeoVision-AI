const Lights = () => {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2.5}
      />

      <pointLight
        position={[-5, -5, -5]}
        intensity={1}
        color="#00ffff"
      />
    </>
  );
};

export default Lights;