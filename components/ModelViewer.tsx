"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/model/1floor.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
}

export default function ModelViewer() {
  return (
    <Canvas
      shadows
      camera={{ position: [90, 22, 0.01], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={80}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.001}
        />
        <Model />
        <OrbitControls enableRotate={false} enableZoom enablePan />
      </Suspense>
    </Canvas>
  );
}
