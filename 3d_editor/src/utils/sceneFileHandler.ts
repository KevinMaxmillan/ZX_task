import type { SceneObject } from '../types/scene';

export function saveScene(objects: SceneObject[]) {
    const dataStr = JSON.stringify(objects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scene.json';
    a.click();
  }