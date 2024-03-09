// importo desde react el elemento inputHTMLAttributes (tipos de React)
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

// interfaz con 2 propiedades
interface InputProp
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  classNameDiv?: string;
  classNameInput?: string;
}

// exporto el componente
export const Input = ({
  classNameDiv,
  classNameInput,
  ...props
}: InputProp) => {
  return (
    <div className={classNameDiv}>
      <input
        {...props}
        className={`${
          classNameInput
            ? classNameInput
            : "first:p-2 mt-5 rounded-3xl w-full border hover:bg-[#ece4e4]"
        }`}
      />
    </div>
  );
};
