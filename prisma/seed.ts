import { PrismaClient } from "@prisma/client";
import bcryp from "bcrypt";
import fs from "fs-extra";
import path from "path";

const prisma = new PrismaClient();

const usersJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../users.json"), "utf-8")
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

  //crear administradores de prueba
  await prisma.admin.createMany({
    data: admins,
    skipDuplicates: true,
  });

  // crear usuarios de prueba
  await prisma.user.createMany({
    data: listUsers,
    skipDuplicates: true,
  });

  // crear categorias de prueba
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  // crear marcas de prueba
  await prisma.brand.createMany({
    data: brands,
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
