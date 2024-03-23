import { create } from "zustand";

interface JwtDecodeState {
  imageUrl: string | null;
}

export const useJwtDecodeStore = create<JwtDecodeState>((set) => ({
  imageUrl: null,
  setImageUrl: (imageUrl: string | null) => set({ imageUrl }),
}));
