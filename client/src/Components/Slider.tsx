import ProductsTop from "./ProductsTop";
const Slider = () => {
  return (
    <>
      <div className="grid grid-cols-3 bg-[#ececec] max-md:grid-cols-2 py-4 mt-16">
        <div className="col-span-1 flex flex-col justify-around items-end max-md:gap-y-6">
          <div className="flex flex-col gap-y-4 max-w-96 max-md:gap-y-0">
            <h2 className="text-2xl text-slate-600 text-end max-md:text-sm font-bold">
              Descuento de 50 %
            </h2>
            <h1 className="text-5xl max-md:text-xl font-bold text-end max-md:items-center max-md:justify-center  ">
              Microsoft Surface book Latpop
            </h1>
          </div>
          <button className="rounded-lg p-4 bg-[#0097a6] max-w-44 text-white max-md:p-2">
            Comprar ahora
          </button>
        </div>
        <div className="col-span-2 flex justify-start max-md:col-span-1">
          <img
            src="images/lenovo-laptops-legion-laptops-legion-y-series-lenovo-legion-7-15-intel-gallery-7.avif"
            alt="Laptop"
            height={900}
            width={900}
          ></img>
        </div>
      </div>
      <ProductsTop />
    </>
  );
};

export default Slider;
