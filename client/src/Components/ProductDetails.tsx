import { useParams } from "react-router-dom";
interface Product {
  id: number;
  nombre: string;
  imagen: string;
  price: number;
  descripcion: string;
  rating: number;
}
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
const ProductDetails = () => {
  const { id } = useParams();
  return <div>aaaaaaaaaa:{id}</div>;
};
export default ProductDetails;
