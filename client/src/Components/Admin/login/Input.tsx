
// importo desde react el elemento inputHTMLAttributes (tipos de React)
import { InputHTMLAttributes } from "react"

// interfaz con 2 propiedades
interface InputProp extends InputHTMLAttributes<HTMLInputElement>  { 
    classNameDiv?: string,
    classNameInput?: string
}

// exporto el componente
export const Input = ({classNameDiv, classNameInput}:InputProp) => {
  return (
      <div className={classNameDiv}>
           <input
              className={`${classNameInput?classNameInput:'first:p-2 mt-8 rounded-xl border hover:bg-[#faf7f7]'}`}             
            />
      </div> 
  )
}