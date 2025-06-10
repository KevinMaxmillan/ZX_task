import { useSceneStore } from '../store/sceneStore';
import { SceneCanvas } from '../components/sceneCanvas'
import { saveScene, loadSceneFromFile } from '../utils/sceneFileHandler';

const SceneEditor = () => {
  const { addObject, objects, setObjects, deleteObject, selectedObjectId } = useSceneStore();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <button onClick={() => addObject('cube')}>Add Cube</button>
        <button onClick={() => addObject('sphere')}>Add Sphere</button>
        <button onClick={() => saveScene(objects)}>Save Scene</button>
        <button onClick={() => loadSceneFromFile(setObjects)}>Load Scene</button>
        <button 
          onClick={() => selectedObjectId && deleteObject(selectedObjectId)}
          disabled={!selectedObjectId}
        >
          Delete Selected
        </button>
      </div>
      <SceneCanvas />
    </div>
  );
};

export default SceneEditor;
