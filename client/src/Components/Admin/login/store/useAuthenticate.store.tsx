import { create } from "zustand";
interface IAuthenticate {
  authenticate: boolean | null;
  setAuthenticate: (value: boolean) => void;
}

export const useAuthenticateStore = create<IAuthenticate>((set) => ({
  authenticate: null,
  setAuthenticate: (value: boolean) => set({ authenticate: value }),
}));
