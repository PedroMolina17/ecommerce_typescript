import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import bcryp from "bcrypt";
const prisma = new PrismaClient();
const usersJson = JSON.parse(
  fs.readFileSync(
    "/home/santiago/Escritorio/proyecto/e_commerce/users.json",
    "utf-8"
  )
);
const administradores = [
  {
    userName: "admin",
    email: "admin@example.com",
    password: "password",
  },
];
const usuarios = [
  {
    userName: "admin",
    email: "admin@example.com",
    password: "password",
  },
  {
    userName: "Aran",
    email: "armandortmontes@gmail.com",
    password: "12345678",
  },
  {
    userName: "JohnDoe",
    email: "johndoe@example.com",
    password: "password123",
  },
  {
    userName: "JaneSmith",
    email: "janesmith@example.com",
    password: "p@ssw0rd",
  },
  {
    userName: "MikeJohnson",
    email: "mikejohnson@example.com",
    password: "securepwd",
  },
  {
    userName: "EmilyBrown",
    email: "emilybrown@example.com",
    password: "pass1234",
  },
  {
    userName: "DavidWilson",
    email: "davidwilson@example.com",
    password: "mysecretpass",
  },
  {
    userName: "SarahTaylor",
    email: "sarahtaylor@example.com",
    password: "password1",
  },
  {
    userName: "ChrisDavis",
    email: "chrisdavis@example.com",
    password: "p@ssword",
  },
  {
    userName: "JessicaAnderson",
    email: "jessicaanderson@example.com",
    password: "12345678",
  },
  {
    userName: "RyanThomas",
    email: "ryanthomas@example.com",
    password: "password123",
  },
  {
    userName: "MeganWhite",
    email: "meganwhite@example.com",
    password: "mypass123",
  },
  {
    userName: "AndrewLee",
    email: "andrewlee@example.com",
    password: "password12",
  },
  {
    userName: "OliviaHarris",
    email: "oliviaharris@example.com",
    password: "mypassword",
  },
  {
    userName: "DanielClark",
    email: "danielclark@example.com",
    password: "12345678",
  },
  {
    userName: "LaurenLewis",
    email: "laurenlewis@example.com",
    password: "password123",
  },
  {
    userName: "JustinRoberts",
    email: "justinroberts@example.com",
    password: "myp@ssword",
  },
  {
    userName: "AmandaWalker",
    email: "amandawalker@example.com",
    password: "password123",
  },
  {
    userName: "BrandonHall",
    email: "brandonhall@example.com",
    password: "mypassword12",
  },
  {
    userName: "StephanieYoung",
    email: "stephanieyoung@example.com",
    password: "p@ssword123",
  },
  {
    userName: "KevinKing",
    email: "kevinking@example.com",
    password: "password1234",
  },
  {
    userName: "RachelScott",
    email: "rachelscott@example.com",
    password: "mypass@123",
  },
  {
    userName: "JasonGreen",
    email: "jasongreen@example.com",
    password: "myp@ssw0rd",
  },
  {
    userName: "MelissaBaker",
    email: "melissabaker@example.com",
    password: "password123",
  },
  {
    userName: "EricWright",
    email: "ericwright@example.com",
    password: "mysecretpass",
  },
  {
    userName: "NicoleTurner",
    email: "nicoleturner@example.com",
    password: "password1",
  },
  {
    userName: "ScottAdams",
    email: "scottadams@example.com",
    password: "p@ssword",
  },
  {
    userName: "KimberlyMorris",
    email: "kimberlymorris@example.com",
    password: "12345678",
  },
  {
    userName: "MatthewParker",
    email: "matthewparker@example.com",
    password: "password123",
  },
  {
    userName: "SamanthaRogers",
    email: "samantharogers@example.com",
    password: "mypassword",
  },
  {
    userName: "PatrickRussell",
    email: "patrickrussell@example.com",
    password: "12345678",
  },
  {
    userName: "VictoriaCox",
    email: "victoriacox@example.com",
    password: "password123",
  },
  {
    userName: "EdwardReed",
    email: "edwardreed@example.com",
    password: "myp@ssword",
  },
  {
    userName: "AmyStewart",
    email: "amystewart@example.com",
    password: "password123",
  },
  {
    userName: "GaryBell",
    email: "garybell@example.com",
    password: "mypass123",
  },
  {
    userName: "ChristinaPerry",
    email: "christinaperry@example.com",
    password: "password12",
  },
  {
    userName: "MarkMorgan",
    email: "markmorgan@example.com",
    password: "mypassword",
  },
  {
    userName: "LindaMurphy",
    email: "lindamurphy@example.com",
    password: "12345678",
  },
  {
    userName: "NathanCooper",
    email: "nathancooper@example.com",
    password: "password123",
  },
  {
    userName: "KellyHoward",
    email: "kellyhoward@example.com",
    password: "myp@ssword",
  },
  {
    userName: "RebeccaCarter",
    email: "rebeccacarter@example.com",
    password: "password123",
  },
  {
    userName: "JoshuaGray",
    email: "joshuagray@example.com",
    password: "mypassword12",
  },
  {
    userName: "TiffanyRivera",
    email: "tiffanyrivera@example.com",
    password: "p@ssword123",
  },
  {
    userName: "ChristopherWard",
    email: "christopherward@example.com",
    password: "password1234",
  },
  {
    userName: "VanessaBrooks",
    email: "vanessabrooks@example.com",
    password: "mypass@123",
  },
  {
    userName: "StevenHill",
    email: "stevenhill@example.com",
    password: "myp@ssw0rd",
  },
  {
    userName: "CatherineBennett",
    email: "catherinebennett@example.com",
    password: "password123",
  },
  {
    userName: "GeorgeCruz",
    email: "georgecruz@example.com",
    password: "mysecretpass",
  },
  {
    userName: "HannahMitchell",
    email: "hannahmitchell@example.com",
    password: "password1",
  },
  {
    userName: "TravisWard",
    email: "travisward@example.com",
    password: "p@ssword",
  },
  {
    userName: "KatherineFoster",
    email: "katherinefoster@example.com",
    password: "12345678",
  },
  {
    userName: "AndrewSimmons",
    email: "andrewsimmons@example.com",
    password: "password123",
  },
  {
    userName: "pedro.molinanoa@gmail.com",
    email: "pedro.molinanoa@gmail.com",
    password: "mypassword",
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
    (user: {
      email: string;
      login: { username: string; password: string };
      picture: { thumbnail: string };
      cell:string;
      location:{city:string}
    }) =>{
      if(user.login.password.length < 8){
        let acc=1
        console.log(acc++)
      }
     return {
      email: user.email,
      userName: user.login.username,
      password: bcryp.hashSync( user.login.password,10),
      image: user.picture.thumbnail,
      phone: user.cell,
      addres: user.location.city
    }}
  );

  const admins = administradores.map((admin) => ({
    ...admin,
    password: bcryp.hashSync(admin.password, 10),
  }));
  const users = usuarios.map((user) => ({
    ...user,
    password: bcryp.hashSync(user.password, 10),
  }));
  //crear administradores de prueba
  await prisma.admin.createMany({
    data: admins,
    skipDuplicates: true,
  });

  // crear usuarios de prueba
  await prisma.user.createMany({
    data: users,
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
