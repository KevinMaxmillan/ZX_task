import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSceneStore } from '../store/sceneStore';


export  const SceneCanvas = () => {
    const {
      objects,
      selectedObjectId,
      setSelectedObjectId,
      
    } = useSceneStore();
  
    return (
        <Canvas shadows camera={{ position: [-5, 1, 5], fov: 25 }}>
        <ambientLight intensity={0.5} />
        {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
        <spotLight intensity={80} position={[2, 5, 1]}/>
        <OrbitControls />
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
              {obj.type === 'cube' ? <boxGeometry /> : <sphereGeometry />}
              <meshStandardMaterial
                color={selectedObjectId === obj.id ? 'hotpink' : 'orange'}
              />
            </mesh>
            
          </group>
        ))}
      </Canvas>
    );
  };
  
