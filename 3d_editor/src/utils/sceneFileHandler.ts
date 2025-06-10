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

export function loadSceneFromFile(callback: (objs: SceneObject[]) => void) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const objects = JSON.parse(reader.result as string);
        callback(objects);
      };
      reader.readAsText(file);
    };
    input.click();
  }