import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IoMdClose } from "react-icons/io";
interface IButtonCloseProps
  extends Pick<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  > {
  onClick?: () => void;
}
const ButtonClose = ({ onClick, ...props }: IButtonCloseProps) => {
  return (
    <button type="button" onClick={onClick} {...props}>
      <IoMdClose />
    </button>
  );
};
export default ButtonClose;
