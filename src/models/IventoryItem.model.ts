import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const IventoryItem = sequelize.define("IventoryItem", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unique_of_measurement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upper_quantity_bound: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lower_quantity_bound: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: true,
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

IventoryItem.sync({
  alter: true,
});

export default IventoryItem;