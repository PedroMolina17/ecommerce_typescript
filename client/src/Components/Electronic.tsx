import Filter from "./Filter";
const Electronic = () => {
  return (
    <div className="bg-[#f7f7f7] py-4 flex items-center justify-center w-full ">
      <div className="mx-28 grid grid-cols-10 max-md:mx-0  max-md:grid-cols-1">
        <div className="col-span-2 max-md:hidden ">
          <div className="bg-white shadow-md  rounded-md">
            <p className="border-b-2 p-2 mx-4 font-bold">
              Categorias de Productos
            </p>
            <ul className="text-slate-500 flex  flex-col gap-3 m-2 mx-4">
              <li>Electronica</li>
              <li>Ofertas de hoy</li>
              <li>Celulares</li>
              <li>Accesorios moviles</li>
              <li>Accesorios de computadoras</li>
            </ul>
          </div>
          <div className="bg-white shadow-md  mt-10 rounded-md">
            <p className="border-b-2 p-2 mx-4 font-bold">Filtrar</p>
            <ul className="text-slate-500 flex  flex-col gap-3 m-2 mx-4">
              <label className="flex gap-2 items-center">
                <input type="checkbox"></input> En stock(14)
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox"></input> Sin stock
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex gap-2">
                  $
                  <input
                    type="number"
                    placeholder="From"
                    className="focus:outline-[#139dba] border rounded-sm"
                  ></input>
                </label>
                <label className="flex gap-2">
                  $
                  <input
                    type="number"
                    placeholder="To"
                    className="focus:outline-[#139dba] border rounded-sm"
                  ></input>
                </label>
              </div>
              <li>Celulares</li>
              <li>Accesorios moviles</li>
              <li>Accesorios de computadoras</li>
            </ul>
          </div>
        </div>
        <div className="col-span-8 overflow-hidden">
          <Filter></Filter>
        </div>
      </div>
    </div>
  );
};

export default Electronic;
