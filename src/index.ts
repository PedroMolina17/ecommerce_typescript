import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";

const development = dotenv.config({
  path: path.resolve(__dirname, "../environments/.env.development"),
}).parsed;
const production = dotenv.config({
  path: path.resolve(__dirname, "../environments/.env.production"),
}).parsed;

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use("/", router);

const ENV = process.env.NODE_ENV === "DEVELOPMENT" ? development : production;

app.listen(ENV?.NODE_PORT, () =>
  console.log(`Server running on port ${ENV?.NODE_PORT}`)
);
