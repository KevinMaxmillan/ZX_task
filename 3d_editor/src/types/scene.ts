export type ObjectType = 'cube' | 'sphere';

export interface SceneObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export interface SceneState {
    objects: SceneObject[];
    selectedObjectId: string | null;
    addObject: (type: 'cube' | 'sphere') => void;
    setSelectedObjectId: (id: string | null) => void;
    updateObject: (id: string, data: Partial<SceneObject>) => void;
    setObjects: (objects: SceneObject[]) => void;
    transformMode: 'translate' | 'rotate' | 'scale';
    setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
    deleteObject: (id: string) => void;
  }