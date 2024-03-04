import { create } from "zustand";
interface IRowValue {
  rowValue: {
    id: number;
    userName: string;
    email: string;
    role: string;
  };
  setRowValue: (rowValue: IRowValue["rowValue"]) => void;
}
export const useRowValueStore = create<IRowValue>((set) => ({
  rowValue: {
    id: 0,
    userName: "",
    email: "",
    role: "",
  },
  setRowValue: (rowValue: IRowValue["rowValue"]) =>
    set((state: { rowValue: IRowValue["rowValue"] }) => ({
      ...state,
      rowValue,
    })),
}));
