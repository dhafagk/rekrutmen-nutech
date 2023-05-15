import { create } from "zustand";

interface ProductProps {
  page: number;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setPage: (page: number) => void;
}

export const ProducStore = create<ProductProps>()((set) => ({
  page: 1,
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set(() => ({ searchQuery })),
  setPage: (page: number) => set(() => ({ page })),
}));
