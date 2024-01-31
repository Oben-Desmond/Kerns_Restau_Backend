import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import "./src/configs/db"
import catRouter from "./src/routes/categories.routes"
import orderRouter from "./src/routes/orders.routes"
import menuItemRouter from "./src/routes/menuitems.routes"

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
// app.use(`/`, (req, res) => res.send("Server running :) " + VERSION_NUMBER));



//start server
app.listen(port, () => console.log(`Server started on port ${port}`));

