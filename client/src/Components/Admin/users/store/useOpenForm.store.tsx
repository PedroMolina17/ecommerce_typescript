import {create} from "zustand";
interface IOpenForm {
    openForm: boolean
    setOpenForm: (openForm: boolean) => void
}
export const useOpenFormStore = create<IOpenForm>((set) => ({
    openForm: false,
    setOpenForm: (openForm) => set({openForm}),
}))