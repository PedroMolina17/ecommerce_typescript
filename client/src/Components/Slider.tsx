const Slider = () => {
  return (
    <div className="grid grid-cols-3 bg-[#ececec] ">
      <div className="col-span-1 flex flex-col justify-around items-end">
        <div className="flex flex-col   gap-y-4 w-96">
          <h2 className="text-2xl text-slate-600 text-end">
            {" "}
            Descuento de 50 %
          </h2>
          <h1 className="text-5xl  font-bold text-end">
            {" "}
            Microsoft Surface book Latpop
          </h1>
        </div>
        <button className="rounded-lg p-4 bg-[#0097a6] w-44 text-white">
          {" "}
          Comprar ahora
        </button>
      </div>
      <div className="col-span-2">
        {" "}
        <img src="../../public/images/lenovo-laptops-legion-laptops-legion-y-series-lenovo-legion-7-15-intel-gallery-7.avif"></img>
      </div>
    </div>
  );
};

export default Slider;
