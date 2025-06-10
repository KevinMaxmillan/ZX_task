import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useSceneStore } from "../store/sceneStore";
import { Object3D } from "three";
import { useState } from "react";
import { TransformModeControls } from "./transformMode";



export const SceneCanvas = () => {
  const { objects, selectedObjectId, setSelectedObjectId, updateObject } =
    useSceneStore();
  const [transformMode, setTransformMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {selectedObjectId && <TransformModeControls setMode={setTransformMode} />}
      <Canvas shadows camera={{ position: [-5, 1, 5], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={80} position={[2, 5, 1]} />
        <OrbitControls makeDefault />
        {objects.map((obj) => (
          <group key={obj.id}>
            <mesh
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
                color={selectedObjectId === obj.id ? "hotpink" : "orange"}
              />
            </mesh>
            {selectedObjectId === obj.id && (
              <TransformControls
                mode={transformMode}
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
      </Canvas>
    </div>
  );
};
