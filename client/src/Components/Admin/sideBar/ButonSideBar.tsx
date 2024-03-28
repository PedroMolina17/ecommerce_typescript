interface ButonSideBarProps {
  icon: any;
}

const ButonSideBar = ({ icon }: ButonSideBarProps) => {
  return (
    <div
      className={`w-16 cursor-pointer rounded-md h-16 flex justify-center items-center`}
    >
      {icon}
    </div>
  );
};

export default ButonSideBar;
