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
        className="px-8 py-1.5 border  rounded-md  focus:ring-[#3293c0]"
      />
      <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <MdPersonSearch className="text-xl text-[#3293c0]" />
      </span>
    </div>
  );
};
export default SearchInput;
