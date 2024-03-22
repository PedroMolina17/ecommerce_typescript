import { create } from "zustand";

interface IOpenItem {
  openItem: {
    notifications: boolean;
    settings: boolean;
  };
  setOpenItem: (nameItem: "notifications" | "settings") => void;
}

export const useOpenItemStorNavBar = create<IOpenItem>((set) => ({
  openItem: {
    notifications: false,
    settings: false,
  },
  setOpenItem: (nameItem) =>
    set((state) => {
      const newState = { openItem: { ...state.openItem } };

      if (state.openItem[nameItem]) {
        newState.openItem[nameItem] = false;
      } else {
        newState.openItem[nameItem] = true;
        newState.openItem[
          nameItem === "notifications" ? "settings" : "notifications"
        ] = false;
      }

      return newState;
    }),
}));
