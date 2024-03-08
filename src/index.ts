// Importaciones
import express, { Request,Response,NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { sendErrorResponse } from "./utils/sendErrorResponse.util";
export const ENV =
  process.env.NODE_ENV === "DEVELOPMENT"
    ? dotenv.config({
        path: path.resolve(__dirname, "../environments/.env.development"),
      }).parsed
    : dotenv.config({
        path: path.resolve(__dirname, "../environments/.env.production"),
      }).parsed;

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(morgan("dev")); 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); 

app.use("/api", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  console.log("--->", err);
  sendErrorResponse(res, statusCode, message);
});


app.listen(ENV?.NODE_PORT, () =>
  console.log(`Servidor corriendo en el puerto ${ENV?.NODE_PORT}`)
);
