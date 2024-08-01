// Importaciones
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { sendErrorResponse } from "./utils/sendErrorResponse.util";
import cron from "node-cron";
import { InventoryCheckerService } from "./services/admin/InventoryChecker.service";
import { PrismaClient } from "@prisma/client";
import { NotificationsService } from "./services/admin/notifications.service";
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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  sendErrorResponse(res, statusCode, message);
});
const server = http.createServer(app);
export const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(ENV?.NODE_PORT, () =>
  console.log(`Servidor corriendo en el puerto ${ENV?.NODE_PORT}`)
);

const inventoryCheckerService = new InventoryCheckerService(
  new PrismaClient(),
  new NotificationsService(new PrismaClient())
);
cron.schedule("*/1 * * * *", async () => {
  try {
    // Verificar el stock de los productos
    const productos = await inventoryCheckerService.checkStockProducts();
    if (productos.length > 0) {
      const notification = await inventoryCheckerService.sendNotification(
        productos
      );

      io.emit("notification", notification);
    }
  } catch (error) {
    console.error("Error al verificar el inventario:", error);
  }
});
