import { create } from "zustand";
interface IRowValue {
  rowValue: {
    id: number;
    name: string;
  };
  setRowValue: (rowValue: IRowValue["rowValue"]) => void;
}
export const useRowValueStore = create<IRowValue>((set) => ({
  rowValue: {
    id: 0,
    name: "",
  },
  setRowValue: (rowValue: IRowValue["rowValue"]) =>
    set((state: { rowValue: IRowValue["rowValue"] }) => ({
      ...state,
      rowValue,
    })),
}));
