export type ObjectType = 'cube' | 'sphere';

export interface SceneObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface Scene {
  objects: SceneObject[];
} 

export interface SceneState {
    objects: SceneObject[];
    selectedObjectId: string | null;
    addObject: (type: 'cube' | 'sphere') => void;
    setSelectedObjectId: (id: string | null) => void;
    updateObject: (id: string, data: Partial<SceneObject>) => void;
    setObjects: (objects: SceneObject[]) => void;
    
  }