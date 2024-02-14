import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Drinks = sequelize.define("Drinks", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  containerType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

Drinks.sync({
  alter: true,
});

export default Drinks;
