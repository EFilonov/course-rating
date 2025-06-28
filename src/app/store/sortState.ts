import { create } from "zustand";

interface SortState {
    sortType: string;
    setSortType: (sortValue: string) => void;
}

export const sortState = create<SortState>(set => ({
    sortType: 'rating',
    setSortType: (sortValue: string) => set((state) => ({ sortType: sortValue  })),
}));
