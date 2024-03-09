interface MyObject {
  id: number;
  title: string;
  discount: string;
  image: string;
}
const products: MyObject[] = [
  {
    id: 1,
    title: "Best Samsung Cellphone",
    discount: "10%",
    image: "https://micelu.co/wp-content/uploads/2022/11/celulares-micelu-.png",
  },
  {
    id: 2,
    title: "Best Samsung Tv",
    discount: "20%",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/pe/qn75q80cagxpe/gallery/pe-qled-tv-qn75q80cagxpe-front-gray-537218005?$650_519_PNG$",
  },
  {
    id: 3,
    title: "Best Lenovo",
    discount: "30%",
    image:
      "https://i.blogs.es/3ac71c/71fkxd1tnwl._ac_sl1500_-removebg-preview/450_1000.png",
  },
];
const ProductsTop = () => {
  return (
    <div className="grid grid-cols-3  my-6 mx-8 gap-8  max-md:grid-cols-1 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-span-1 bg-[#ececec] p-4 flex w-full gap-1 justify-around  max-md:rounded-lg"
        >
          <div className="flex flex-col justify-center items-end ">
            <p className="text-sm ">Descuento de {product.discount}</p>
            <p className="text-3xl max-md:text-xl font-bold text-end">
              {" "}
              {product.title}
            </p>
            <p className="text-[#139dba] py-4 font-bold underline">Comprar</p>
          </div>
          <div className="flex ">
            <img
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTop;
