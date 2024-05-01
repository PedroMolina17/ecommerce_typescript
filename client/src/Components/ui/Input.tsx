import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText?: string;
  labelFor?: string;
  labelClass?: string;
  register?: any;
}

const Input = ({
  labelText,
  labelClass,
  labelFor,
  register,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={labelFor} className={`${labelClass}`}>
        {labelText}
      </label>
      <input {...props} {...register} />
    </div>
  );
};

export default Input;
