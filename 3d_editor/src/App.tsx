import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls, Leva } from "leva";
import * as THREE from "three";
import { createRoot } from "react-dom/client";

function AnimatedBox() {
  const boxRef = useRef<THREE.Mesh>(null!);

  const {color, speed} = useControls({

    color:'#00bff',

    speed:{
      value: 0.005,
      min:0.0,
      max:0.03,
      step:0.001,
    },
  })

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  })

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <axesHelper args={[5]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <Leva />
      <div id="canvas-container">
        <Canvas shadows camera={{ position: [-5, 1, 5], fov: 25 }}>
          
          <AnimatedBox />
          <OrbitControls panSpeed={2} />
          <ambientLight intensity={0.1} />
          <spotLight intensity={80} position={[2, 5, 1]}/>
        </Canvas>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
