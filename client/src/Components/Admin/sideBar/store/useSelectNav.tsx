import { create } from "zustand";
interface ISelectNav {
  selectNav: string;
  setSelectNav: (value: string) => void;
}
export const useSelectNavStore = create<ISelectNav>((set) => ({
  selectNav: "Users",
  setSelectNav: (value: string) => set({ selectNav: value }),
}));
