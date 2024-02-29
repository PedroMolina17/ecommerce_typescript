import React from 'react';
import Logo from '../../assets/logo.jpeg'; // importo la imagen a este archivo tsx
import { Input } from './Input';

// Componente a cerar para el login del sistema
const Login = () => {
  return (   
    
    <section className="bg-gray-50 min-h-screen flex items-center justify-center w-full">        
      <div className="bg-[#455591] flex rounded-3xl shadow-lg p-5 items-center">
        <div className="md:w-1/2 px-16 mr-2">
          <h2 className="text-white text-3xl">Iniciar Sesión</h2>
          <p className="text-sm mt-4 text-white">
            Si eres un miembro, porfavor inicie sesión
          </p>
          <form action="" className="flex flex-col gap-4">
           <Input type='email'/>
            <div className="relative">
              <input
                className="p-2 mt-2 rounded-xl border w-full hover:bg-[#faf7f7]"
                type="password"
                name="password"
                placeholder="Contraseña"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </div>
            <button
              className="bg-[#f97f63] rounded-xl text-white py-2 hover:bg-[#e6917e] hover:scale-105 duration-300"
            >
              Iniciar
            </button>
          </form>          
          
        </div>
        <div className="md:block w-96 hidden">
          <img src={Logo} alt="" className="rounded-2xl"/>
        </div>
      </div>
    </section>
  )
}

export default Login