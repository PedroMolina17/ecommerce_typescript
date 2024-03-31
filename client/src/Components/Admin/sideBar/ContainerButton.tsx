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
        selectNav === name ? "bg-darkw text-primary" : "text-white"
      } hover:bg-darkw h-12 overflow-hidden flex items-center gap-1 cursor-pointer rounded-bl-md  rounded-tl-md`}
    >
      <div className="w-12 ">{children}</div>
      <h2 className={` text-sm truncate`}>{title}</h2>
    </div>
  );
};
export default ContainerButton;
