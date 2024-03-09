import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { MdPersonSearch } from "react-icons/md";
interface ISearchInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: any;
}
const SearchInput = ({ register, ...props }: ISearchInputProps) => {
  return (
    <div className="relative w-fit h-fit ">
      <input
        {...props}
        {...register}
        className="block w-full   focus:outline-none border-0  rounded-md  placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-gray-900 text-white ring-1 ring-inset ring-gray-700 focus:ring-2   ps-9 pe-9"
      />
      <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <MdPersonSearch className="text-xl text-[#3293c0]" />
      </span>
    </div>
  );
};
export default SearchInput;
