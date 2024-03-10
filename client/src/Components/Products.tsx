import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { useNavigate } from "react-router-dom";
interface Product {
  id: number;
  nombre: string;
  imagen: string;
  price: number;
  descripcion: string;
  rating: number;
}

const Products = () => {
  const products: Product[] = [
    {
      id: 1,
      nombre: "Mouse Lorem ipsum dolor sit amet consectetur adipisi",
      imagen:
        "https://phantom.pe/media/catalog/product/cache/2d2e350e73065c0f42c90f0a12869353/p/s/ps5_dualsene_celeste.jpg",
      price: 28.95,
      descripcion:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nobis molestiae esse, quod officia quam similique ratione obcaecati libero animi cupiditate, eaque reiciendis fugiat, harum nulla ipsum dolorum suscipit? Maiores!",
      rating: 3,
    },
    {
      id: 2,
      nombre: "Mouse Lorem ipsum dolor sit amet consectetur adipisi",
      imagen:
        "https://pesonyb2c.vtexassets.com/arquivos/ids/221293/01-GENBA-WH-CH520-B-Main-Image-Sony-Store-Online.jpg?v=638180366241000000",
      price: 28.55,
      descripcion:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nobis molestiae esse, quod officia quam similique ratione obcaecati libero animi cupiditate, eaque reiciendis fugiat, harum nulla ipsum dolorum suscipit? Maiores!",
      rating: 4,
    },
    {
      id: 3,
      nombre: "Mouse Lorem ipsum dolor sit amet consectetur adipisi",
      imagen:
        "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/b9b45080-cc1a-46c9-8ee9-08e1cb676241.f938776a5c045661d0c99a5bba5006f3.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      price: 100.55,
      descripcion:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nobis molestiae esse, quod officia quam similique ratione obcaecati libero animi cupiditate, eaque reiciendis fugiat, harum nulla ipsum dolorum suscipit? Maiores!",
      rating: 4,
    },
    {
      id: 4,
      nombre: "Mouse Lorem ipsum dolor sit amet consectetur adipisi",
      imagen:
        "https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00075976321856l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      price: 400.55,
      descripcion:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nobis molestiae esse, quod officia quam similique ratione obcaecati libero animi cupiditate, eaque reiciendis fugiat, harum nulla ipsum dolorum suscipit? Maiores!",
      rating: 4.5,
    },
    {
      id: 5,
      nombre: "Mouse Lorem ipsum dolor sit amet consectetur adipisi",
      imagen:
        "https://oechsle.vteximg.com.br/arquivos/ids/3598441-1000-1000/image-78216297094e4099837ea064fa7d461a.jpg?v=637551816149270000",
      price: 100.55,
      descripcion:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nobis molestiae esse, quod officia quam similique ratione obcaecati libero animi cupiditate, eaque reiciendis fugiat, harum nulla ipsum dolorum suscipit? Maiores!",
      rating: 5,
    },
  ];
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IoIosStar key={i} className="text-yellow-500" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<IoIosStar key={i} className="text-gray-400" />);
      }
    }

    return stars;
  };
  const navigate = useNavigate();

  const navigateToProductDetails = (productId: number) => {
    navigate(`/electronics/${productId.toString()}`);
  };

  return (
    <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 mt-16">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-span-1 border rounded-md"
          onClick={() => navigateToProductDetails(product.id)}
        >
          <div className="border-b-4">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex gap-1 items-center ">
              {renderStars(product.rating)}
            </div>
            <p className="text-slate-500">{product.nombre}</p>
            <p className="text-[#139dba] font-bold">${product.price}</p>
            <button className="py-2 text-center bg-[#cccccc] rounded-md min-w-8 ">
              Add Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
