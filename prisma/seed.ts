import { PrismaClient } from "@prisma/client";
import bcryp from "bcrypt";
import fs from "fs-extra";
import path from "path";

const prisma = new PrismaClient();

export interface ListProducts {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
const usersJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../users.json"), "utf-8"),
);

const productsJson: ListProducts = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../products.json"), "utf-8"),
);

const administradores = [
  {
    userName: "admin",
    email: "admin@example.com",
    password: "password",
    image: "https://api.randomuser.me/portraits/lego/2.jpg",
  },
  {
    userName: "admin2",
    email: "admin2@example.com",
    password: "password",
    image: "https://api.randomuser.me/portraits/lego/1.jpg",
  },
];

const categories = [
  {
    name: "Laptops",
  },
  {
    name: "Desktops",
  },
  {
    name: "Monitors",
  },
  {
    name: "Keyboards",
  },
  {
    name: "Mice",
  },
  {
    name: "Printers",
  },
  {
    name: "Scanners",
  },
  {
    name: "Routers",
  },
  {
    name: "Software",
  },
  {
    name: "Accessories",
  },
];

const brands = [
  {
    name: "Samnsung",
  },
  {
    name: "Xiaomi",
  },
  {
    name: "LG",
  },
  {
    name: "Motorola",
  },
  {
    name: "IPhone",
  },
  {
    name: "Google",
  },
  {
    name: "OnePlus",
  },
  {
    name: "Blu",
  },
  {
    name: "ZTE Blade",
  },
  {
    name: "Doogee",
  },
];

async function main() {
  const listUsers = usersJson.results.map(
    (
      user: {
        email: string;
        login: { username: string; password: string };
        picture: { large: string };
        cell: string;
        location: { city: string };
      },
      index: number,
    ) => {
      if (user.login.password.length < 8) {
        let acc = 1;
        // console.log(acc++);
      }
      return {
        email: user.email,
        userName: user.login.username,
        password: bcryp.hashSync(user.login.password, 10),
        image: user.picture.large,
        phone: user.cell,
        address: user.location.city,
      };
    },
  );

  const admins = administradores.map((admin) => ({
    ...admin,
    password: bcryp.hashSync(admin.password, 10),
  }));

  // create administrators
  await prisma.admin.createMany({
    data: admins,
    skipDuplicates: true,
  });

  // create users
  await prisma.user.createMany({
    data: listUsers,
    skipDuplicates: true,
  });

  // The repeats were not eliminated because skipDuplicates is being used
  const listCategories = productsJson.products.map((el: any) => {
    return {
      name: el.category,
    };
  });

  // create categories
  await prisma.category.createMany({
    data: listCategories,
    skipDuplicates: true,
  });

  // The repeats were not eliminated because skipDuplicates is being used
  const listBrands = productsJson.products.map((el: any) => {
    return {
      name: el.brand,
    };
  });

  // create brands
  await prisma.brand.createMany({
    data: listBrands,
    skipDuplicates: true,
  });

  const listProducts = productsJson.products.map(async (product: Product) => {
    const brandId = await prisma.brand.findFirst({
      where: {
        name: product.brand,
      },
      select: {
        id: true,
      },
    });
    const categoryId = await prisma.category.findFirst({
      where: {
        name: product.category,
      },
      select: {
        id: true,
      },
    });
    return {
      name: product.title,
      description: product.description,
      salePrice: product.price,
      purchasePrice: product.price - product.price * 0.15,
      stock: product.stock,
      status: true,
      active: true,
      promotion: false,
      promotionPrice: 0,
      promotionDescription: "",
      categoryId: categoryId?.id!,
      brandId: brandId?.id!,
      images: product.images,
      imageCover: product.thumbnail,
    };
  });

  // create products y imagen de producto y imagen de  portada
  for (let i: number = 0; i < listProducts.length; i++) {
    const {
      name,
      description,
      salePrice,
      purchasePrice,
      stock,
      status,
      active,
      promotion,
      promotionPrice,
      promotionDescription,
      categoryId,
      brandId,
      images,
      imageCover,
    } = await listProducts[i];
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        salePrice,
        purchasePrice,
        stock,
        status,
        active,
        promotion,
        promotionPrice,
        promotionDescription,
        categoryId,
        brandId,
      },
    });
    const newImageCover = await prisma.productCoverImage.create({
      data: {
        productId: newProduct.id,
        imageProduct: imageCover,
      },
    });
    for (let j: number = 0; j < images.length; j++) {
      const newImage = await prisma.imageProduct.create({
        data: {
          productId: newProduct.id,
          imageProduct: images[j],
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
