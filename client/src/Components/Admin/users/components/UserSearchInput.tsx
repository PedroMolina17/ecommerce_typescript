import { MdPersonSearch } from "react-icons/md";
interface UserSearchInputProps {
  register: any;
}
const UserSearchInput = ({ register }: UserSearchInputProps) => {
  return (
    <div className="relative w-fit h-fit ">
      <input
        type="search"
        placeholder="Search for user name..."
        {...register}
        className="px-8 py-1.5 border  rounded-md  focus:ring-[#3293c0]"
      />
      <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <MdPersonSearch className="text-xl text-[#3293c0]" />
      </span>
    </div>
  );
};
export default UserSearchInput;
