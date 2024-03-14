import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useOpenFormStore } from "../store/useOpenForm.store";
import { useRowValueStore } from "../store/useRowValue.store";

export const MySwal = withReactContent(Swal);
const ButtonsActionTable = ({ cell, mutation }: any) => {
  const { setRowValue } = useRowValueStore((state) => state);
  const { setOpenForm } = useOpenFormStore((state) => state);
  return (
    <div className="flex gap-2 px-2 items-center justify-center ">
      <button
        onClick={() => {
          setRowValue(cell.row.original);
          setOpenForm(true);
        }}
      >
        <CiEdit
          className="text-lg text-blue-500 hover:text-blue-600"
          strokeWidth="0.5"
        />
      </button>
      <button
        onClick={() => {
          MySwal.fire({
            title: `Are you sure to eliminate ${cell.row.original.userName} ?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              mutation.mutate(cell.row.original.id);
            }
          });
        }}
      >
        <MdDeleteOutline className="text-lg text-red-500 hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsActionTable;
