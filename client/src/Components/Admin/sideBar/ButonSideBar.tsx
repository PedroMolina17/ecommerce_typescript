interface ButonSideBarProps {
    name?: string;
    icon?: any;
    onClick?: () => void;
    children?: React.ReactNode;
}
const ButonSideBar = ({icon,name,onClick}:ButonSideBarProps) => {
  
  return (
    <button onClick={onClick}  className={` w-12 cursor-pointer  rounded-md h-12 flex justify-center items-center `}>
      {icon}
    </button>
  );
};
export default ButonSideBar;
