import { FaImage } from "react-icons/fa";
import { useRef, useState } from "react";

const CreateProduct = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex text-darkText flex-col">
      <h1 className="text-4xl block my-4">Add Product</h1>
      <div className="w-full grid grid-cols-12 gap-8">
        <div className="grid col-span-8">
          <div className="flex flex-col gap-8">
            <label className="flex flex-col gap-2">
              Producto
              <input className=" bg-darkSecondary rounded-sm h-8 text-darkPrimary p-1"></input>
            </label>
            <label className="flex flex-col gap-2">
              Producto
              <textarea className=" bg-darkSecondary rounded-sm h-48 text-darkPrimary p-1"></textarea>
            </label>
          </div>
        </div>
        <div className=" col-span-4 flex flex-col gap-8">
          <div className="bg-darkThird p-4 rounded-md">
            <h2 className="text-3xl mb-4">Organizar</h2>
            <div className="flex flex-col gap-8 my-8">
              <label className="flex flex-col gap-2">
                Categoria
                <select className="h-8 text-darkPrimary">
                  <option selected>Valor 1</option>
                  <option>Valor 2</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                Marca
                <select className="h-8 text-darkPrimary">
                  <option selected>Valor 1</option>
                  <option>Valor 2</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                Etiquetas
                <select className="h-8 text-darkPrimary">
                  <option selected>Valor 1</option>
                  <option>Valor 2</option>
                </select>
              </label>
            </div>
          </div>
          <div className="bg-darkThird p-4 rounded-md">
            <h2 className="text-3xl mb-4">Imagenes</h2>
            <div className="flex flex-col gap-8 my-8">
              <label className="flex flex-col gap-2">
                Imagen de Portada
                <button
                  className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                  onClick={handleButtonClick}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-24 border border-darkPrimary"
                    />
                  ) : (
                    <FaImage />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  ></input>
                </button>
              </label>
              <label className="flex flex-col gap-2">
                Imagen de Exibhicion
                <button
                  className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                  id="portada"
                >
                  <FaImage />
                  <input type="file" className="hidden"></input>
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
