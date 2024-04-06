import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText?: string;
  labelFor?: string;
  register?: any;
  labelClass?: string;
  error?: boolean;
}

const Input = ({
  labelText,
  labelClass,
  labelFor,
  register,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={labelFor} className={`${labelClass}`}>
        {labelText}
      </label>
      <input
        {...props}
        className={`${className} ${
          error
            ? "focus:border-red-300 focus:ring-red-300"
            : "focus:ring-blue-300 focus:border-blue-300"
        } `}
        {...register}
      />
    </div>
  );
};

export default Input;
