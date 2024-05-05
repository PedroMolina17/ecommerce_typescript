import { create } from "zustand";

const useProductStore = create((set) => ({
  operation: "ViewProduct",
  productId: null,
  setOperation: (operation: string) => set({ operation }),
  setProductId: (productId: number) => set({ productId }),
}));

export default useProductStore;
