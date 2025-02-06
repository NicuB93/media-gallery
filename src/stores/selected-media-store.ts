import { create } from "zustand";

type State = {
  selected: number[];
};

type Action = {
  addMediaId: (id: number) => void;
  removeAllMediaIds: () => void;
  addMultipleMediaIds: (ids: number[]) => void;
  removeMediaId: (id: number) => void;
  removeMultipleMediaIds: (ids: number[]) => void;
};

export const useSelectedMedia = create<State & Action>((set) => ({
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
