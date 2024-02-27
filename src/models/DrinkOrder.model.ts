import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const DrinkOrder = sequelize.define("DrinkOrder", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  table_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  kitchen_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  finance_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drink_items: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Use JSONB for efficiency
    allowNull: false,
    default: [],
  },
});

sequelize.sync();

export default DrinkOrder;
