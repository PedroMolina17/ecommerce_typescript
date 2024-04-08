import { useSelectNavStore } from "./store/useSelectNav";

interface Props {
  children: React.ReactNode;
  title: string;
  name: string;
  isOpen: boolean;
  onClick?: () => void;
}

const ContainerButton = ({ title, name, onClick, isOpen, children }: Props) => {
  const { selectNav } = useSelectNavStore((state) => state);

  return (
    <div
      onClick={onClick}
      className={`${
        selectNav === name ? "bg-bgHover text-white" : "text-slate-400"
      } hover:bg-bgHover rounded-md h-12 overflow-hidden flex items-center gap-1 cursor-pointer`}
    >
      <div className="w-12">{children}</div>
      <h2 className={`${!isOpen && "hidden"} text-sm truncate`}>{title}</h2>
    </div>
  );
};
export default ContainerButton;
