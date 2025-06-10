import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  
} from "@react-three/drei";
import { useSceneStore } from "../store/sceneStore";
import { Object3D } from "three";
import { TransformModeControls } from "./transformMode";
import { useControls, Leva } from "leva";
import { DoubleSide } from "three";

export const SceneCanvas = () => {

  const { objects, selectedObjectId, setSelectedObjectId, updateObject, transformMode, setTransformMode } = useSceneStore();
 
  const { color } = useControls({
    color: "#00bfff",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {selectedObjectId && <TransformModeControls setMode={setTransformMode} />}

      <Leva />
      
      <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>

        <ambientLight intensity={0.5} />
        <spotLight 
          intensity={500} 
          position={[2, 5, 1]} 
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <OrbitControls makeDefault />

        <gridHelper args={[100, 100]} position={[0, 0.01, 0]} />
        {objects.map((obj) => (
          <group key={obj.id}>
            <mesh
              castShadow
              position={obj.position}
              rotation={obj.rotation}
              scale={obj.scale}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedObjectId(obj.id);
              }}
            >
              {obj.type === "cube" ? (
                <boxGeometry />
              ) : (
                <sphereGeometry args={[0.5, 100, 100]} />
              )}
              <meshStandardMaterial
                color={selectedObjectId === obj.id ? color : "orange"}
              />
            </mesh>
            {selectedObjectId === obj.id && (
              <TransformControls
                mode={transformMode}
                translationSnap={0.5}
                rotationSnap={Math.PI / 4}
                scaleSnap={0.5}
                onObjectChange={(e) => {
                  const target = e?.target as { object: Object3D };
                  if (target?.object) {
                    updateObject(obj.id, {
                      position: target.object.position.toArray() as [
                        number,
                        number,
                        number
                      ],
                      rotation: target.object.rotation.toArray() as [
                        number,
                        number,
                        number
                      ],
                      scale: target.object.scale.toArray() as [
                        number,
                        number,
                        number
                      ],
                    });
                  }
                }}
              />
            )}
          </group>
        ))}

        <mesh rotation={[Math.PI/2,0,0]} receiveShadow>
          <planeGeometry args={[20,20]}/>
          <meshStandardMaterial side={DoubleSide} color="black"/>
        </mesh>
      </Canvas>
    </div>
  );
};
