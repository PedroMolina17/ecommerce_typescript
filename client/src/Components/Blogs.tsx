const Blogs = () => {
  interface MyObject {
    id: number;
    title: string;
    comment: string;
    discount: string;
    image: string;
    date: string;
  }
  const products: MyObject[] = [
    {
      id: 1,
      title: "Best Samsung Cellphone",
      comment:
        "Best Samsung Cellphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perspiciatis corporis qui dolorem explicabo ullam ab, ex fugiat consequatur, reiciendis tenetur voluptatum nam omnis! Facilis nobis culpa eaque perferendis placeat.",
      discount: "10%",
      image:
        "https://i.pinimg.com/564x/b3/77/ac/b377ac64433bda4d45e2bd15d2878f8e.jpg",
      date: "22 Jun del 2017",
    },
    {
      id: 2,
      title: "Best Samsung Cellphone",
      comment:
        "Best Samsung Cellphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perspiciatis corporis qui dolorem explicabo ullam ab, ex fugiat consequatur, reiciendis tenetur voluptatum nam omnis! Facilis nobis culpa eaque perferendis placeat.",

      discount: "10%",
      image:
        "https://i.pinimg.com/564x/55/c1/81/55c181dcd708636feecdd6d5cedfe6ce.jpg",
      date: "22 Jun del 2017",
    },
    {
      id: 3,
      title: "Best Samsung Cellphone",
      comment:
        "Best Samsung Cellphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perspiciatis corporis qui dolorem explicabo ullam ab, ex fugiat consequatur, reiciendis tenetur voluptatum nam omnis! Facilis nobis culpa eaque perferendis placeat.",

      discount: "10%",
      image:
        "https://i.pinimg.com/564x/4e/24/16/4e2416853898e68bb854fc1568d93c57.jpg",
      date: "22 Jun del 2017",
    },
    {
      id: 4,
      title: "Best Samsung Cellphone",
      comment:
        "Best Samsung Cellphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perspiciatis corporis qui dolorem explicabo ullam ab, ex fugiat consequatur, reiciendis tenetur voluptatum nam omnis! Facilis nobis culpa eaque perferendis placeat.",
      discount: "10%",
      image:
        "https://i.pinimg.com/564x/b3/77/ac/b377ac64433bda4d45e2bd15d2878f8e.jpg",
      date: "22 Jun del 2017",
    },
  ];

  return (
    <div className="bg-[#f7f7f7] py-8 mt-16">
      <div className="mx-28 max-md:mx-4 bg-[#f7f7f7]">
        <div className="grid grid-cols-3 max-md:grid-cols-1  gap-x-5 gap-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-tr-md rounded-tl-md flex flex-col "
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-tr-md rounded-tl-md object-cover object-center h-96 w-full  min-w-44"
                />
                <div className="absolute -bottom-4 left-7 bg-[#139dba] text-white rounded-md p-2">
                  <p>{product.date}</p>
                </div>
              </div>
              <div className="flex flex-col py-6 mx-8">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-slate-500 h-20 overflow-hidden">
                  {product.comment}
                </p>
                <p className="text-[#139dba] underline">Leer más</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
