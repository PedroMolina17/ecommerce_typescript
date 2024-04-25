import { create } from "zustand";

const useProductStore = create((set) => ({
  operation: "ViewProduct",
  setOperation: (operation) => set({ operation }),
}));

export default useProductStore;
