import { useSelectNavStore } from "./store/useSelectNav";

interface Props {
  children: React.ReactNode;
  title: string;
  isVisible?: boolean;
  name: string;
  onClick?: () => void;
}
const ContainerButton = ({ title, name, onClick, children }: Props) => {
  const { selectNav } = useSelectNavStore((state) => state);
  return (
    <div
      onClick={onClick}
      className={`${

        selectNav === name ? "bg-darkPrimary text-primary" : "text-white"
      } hover:bg-darkw h-12 overflow-hidden flex items-center gap-1 cursor-pointer rounded-bl-md  rounded-tl-md`}

    >
      <div className="w-12 ">{children}</div>
      <div className="absolute before:top-0 before:w-0 before:h-0 before:border-solid before:border-transparent before:border-t-4 before:border-l-4 before:border-r-transparent before:border-b-transparent before:content before:absolute before:left-0 before:right-auto before:bottom-auto before:ml-1 before:-mt-2 before:bg-white z-50"></div>
      <h2 className={` text-sm truncate`}>{title}</h2>
    </div>
  );
};
export default ContainerButton;
