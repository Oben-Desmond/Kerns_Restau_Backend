import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./src/config/db";
import catRouter from "./src/routes/categories.routes";
import orderRouter from "./src/routes/orders.routes";
import menuItemRouter from "./src/routes/menuitems.routes";
import drinkRouter from "./src/routes/drink.routes";
import inventoryRouter from "./src/routes/inventory.routes";
import rentalRouter from "./src/routes/rental.routes";
import purchaseOrderRouter from "./src/routes/purchaseOrder.routes";
import rentalOrderRouter from "./src/routes/rentalOrders.routes";
import authRouter from "./src/routes/auth.routes";

const app = express();
const port = 5000;

dotenv.config();

const { VERSION_NUMBER } = process.env;

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
app.use(`/api/v${VERSION_NUMBER}/inventory-items`, inventoryRouter);
app.use(`/api/v${VERSION_NUMBER}/rentals`, rentalRouter);
app.use(`/api/v${VERSION_NUMBER}/purchase-orders`, purchaseOrderRouter);
app.use(`/api/v${VERSION_NUMBER}/rental-orders`, rentalOrderRouter);
app.use(`/api/v${VERSION_NUMBER}/auth`, authRouter);

// app.use(`/`, (req, res) => res.send("Server running :) " + VERSION_NUMBER));

//start server
app.listen(port, () => console.log(`Server started on port ${port}`));
