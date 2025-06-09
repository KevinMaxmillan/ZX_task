import { useSceneStore } from '../store/sceneStore';
import { SceneCanvas } from '../components/sceneCanvas'

const SceneEditor = () => {
  const { addObject} = useSceneStore();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <button onClick={() => addObject('cube')}>Add Cube</button>
        <button onClick={() => addObject('sphere')}>Add Sphere</button>
        
      </div>
      <SceneCanvas />
    </div>
  );
};

export default SceneEditor;
