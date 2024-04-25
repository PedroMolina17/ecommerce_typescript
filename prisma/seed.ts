import { PrismaClient } from "@prisma/client";
import bcryp from "bcrypt";
import fs from "fs-extra";
import path from "path";

const prisma = new PrismaClient();

const usersJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../users.json"), "utf-8")
);

const productsJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../products.json"), "utf-8")
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
      index: number
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
    }
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

  const listProducts = await Promise.all(
    productsJson.products.map(async (el: any) => {
      const brand = await prisma.brand.findUnique({
        where: { name: el.brand },
        select: {
          id: true,
        },
      });

      const category = await prisma.category.findUnique({
        where: { name: el.category },
        select: {
          id: true,
        },
      });

      return {
        name: el.title,
        description: el.description,
        price: el.price,
        stock: el.stock,
        brandId: brand ? brand.id : null,
        categoryId: category ? category.id : null,
      };
    })
  );

  // create products
  await prisma.products.createMany({
    data: listProducts,
    skipDuplicates: true,
  });
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
