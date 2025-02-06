import { create } from "zustand";
import { SelectedMediaType } from "./types";

export const useSelectedMedia = create<SelectedMediaType>((set) => ({
  selected: [],
  addMediaId: (id: number) =>
    set((state) => ({
      selected: [...state.selected, id],
    })),
  removeAllMediaIds: () => set({ selected: [] }),
  addMultipleMediaIds: (ids: number[]) => set({ selected: ids }),
  removeMediaId: (id: number) =>
    set((state) => ({
      selected: state.selected.filter((selectedId) => selectedId !== id),
    })),
  removeMultipleMediaIds: (ids: number[]) =>
    set((state) => ({
      selected: state.selected.filter(
        (selectedId) => !ids.includes(selectedId)
      ),
    })),
}));
