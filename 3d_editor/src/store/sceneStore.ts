import { create } from 'zustand';
import type { SceneState } from '../types/scene';
import { v4 as uuidv4 } from 'uuid';



export const useSceneStore = create<SceneState>((set) => ({
    objects: [],
    selectedObjectId: null,
    addObject: (type) =>
      set((state) => ({
        objects: [
          ...state.objects,
          {
            id: uuidv4(),
            type,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            color: '#00bfff',
          },
        ],
      })),
    setSelectedObjectId: (id) => set({ selectedObjectId: id }),
    updateObject: (id, data) =>
      set((state) => ({
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, ...data } : obj
        ),
      })),
    setObjects: (objects) => set({ objects }),
    transformMode: 'translate',
    setTransformMode: (mode) => set({ transformMode: mode }),
    deleteObject: (id: string) =>
      set((state) => ({
        objects: state.objects.filter((obj) => obj.id !== id),
        selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
      })),
  }));
