import { create } from "zustand";

interface IOpenForm {
  openForm: {
    edit: boolean;
    delete: boolean;
    create: boolean;
  };
  setOpenForm: (nameForm: "edit" | "delete" | "create") => void;
}
export const useOpenFormStoreProduct = create<IOpenForm>((set) => ({
  openForm: {
    edit: false,
    delete: false,
    create: false,
  },
  setOpenForm: (nameForm) =>
    set((state) => ({
      ...state,
      openForm: {
        ...state.openForm,
        [nameForm]: !state.openForm[nameForm],
      },
    })),
}));
