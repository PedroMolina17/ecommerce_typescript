import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISelectNav {
  selectNav: string;
  setSelectNav: (value: string) => void;
}

export const useSelectNavStore = create<ISelectNav>()(
  persist(
    (set) => ({
      selectNav: "Users",
      setSelectNav: (value: string) => set({ selectNav: value }),
    }),
    {
      name: "selectNav",
    },
  ),
);
