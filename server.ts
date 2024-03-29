import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http"; // Import http module for creating HTTP server
import { Server as SocketIOServer, Socket } from "socket.io"; // Import Socket.IO

import "./src/config/db";

import catRouter from "./src/routes/categories.routes";
import orderRouter from "./src/routes/orders.routes";
import menuItemRouter from "./src/routes/menuitems.routes";
import drinkRouter from "./src/routes/drink.routes";
import drinkOrderRouter from "./src/routes/drinkOrder.routes";
import inventoryRouter from "./src/routes/inventory.routes";
import rentalRouter from "./src/routes/rental.routes";
import purchaseOrderRouter from "./src/routes/purchaseOrder.routes";
import rentalOrderRouter from "./src/routes/rentalOrders.routes";
import authRouter from "./src/routes/auth.routes";
import userLogsRouter from "./src/routes/userLogs.routes";
import inventoryLogsRouter from "./src/routes/inventoryLogs.routes";
import rentalLogsRouter from "./src/routes/rentalLogs.routes";
import notificationRouter from "./src/routes/notification.routes";
import analyticsRouter from "./src/routes/analytics.stats.routes";

const app = express();

dotenv.config();

const { VERSION_NUMBER, PORT } = process.env;

//initialize cors middleware
app.use(cors());

//initialize body-parser middleware
app.use(bodyParser.json());

//logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

//initialize routes middleware
app.use(`/api/v${VERSION_NUMBER}/categories`, catRouter);
app.use(`/api/v${VERSION_NUMBER}/orders`, orderRouter);
app.use(`/api/v${VERSION_NUMBER}/menu-items`, menuItemRouter);
app.use(`/api/v${VERSION_NUMBER}/drinks`, drinkRouter);
app.use(`/api/v${VERSION_NUMBER}/drink-orders`, drinkOrderRouter);
app.use(`/api/v${VERSION_NUMBER}/inventory-items`, inventoryRouter);
app.use(`/api/v${VERSION_NUMBER}/rentals`, rentalRouter);
app.use(`/api/v${VERSION_NUMBER}/purchase-orders`, purchaseOrderRouter);
app.use(`/api/v${VERSION_NUMBER}/rental-orders`, rentalOrderRouter);
app.use(`/api/v${VERSION_NUMBER}/auth`, authRouter);
app.use(`/api/v${VERSION_NUMBER}/user-logs`, userLogsRouter);
app.use(`/api/v${VERSION_NUMBER}/rental-logs`, rentalLogsRouter);
app.use(`/api/v${VERSION_NUMBER}/inventory-logs`, inventoryLogsRouter);
app.use(`/api/v${VERSION_NUMBER}/notifications`, notificationRouter);
app.use(`/api/v${VERSION_NUMBER}/analytics`, analyticsRouter);

// Create HTTP server
// const server = http.createServer(app);

// // Create Socket.IO server
// export const io = new SocketIOServer(server);

// // Socket.IO connection event
// io.on("connection", (socket: Socket) => {
//   console.log("A client connected");

//   // Handle events from the client
//   socket.on("notification", (data: any) => {
//     console.log("Received data from client:", data);
//     // Process data or emit events to other clients
//   });

//   socket.emit("message", {
//     message: "This is a message from the server!",
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A client disconnected");
//   });
// });

//start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
