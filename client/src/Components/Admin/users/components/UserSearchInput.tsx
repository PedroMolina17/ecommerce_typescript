import { useForm } from "react-hook-form";
import { MdPersonSearch } from "react-icons/md"

const UserSearchInput = () => {
  const { register } = useForm();
  return (
    
    <div className="relative w-fit h-fit ">
        <input
          type="search"
          placeholder="Search for user name..."
          {...register("search")}
          className="px-8 py-2 rounded-md   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3293c0]"
        />
        <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <MdPersonSearch className="text-xl text-[#3293c0]" />
        </span>
      </div>
  )
}
export default UserSearchInput