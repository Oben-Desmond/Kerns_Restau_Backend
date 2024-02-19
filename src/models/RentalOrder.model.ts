import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const RentalOrder = sequelize.define("RentalOrder", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rental_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  finance_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rental_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rental_items: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Use JSONB for efficiency
    allowNull: false,
    default: [],
  },
});

sequelize.sync();

export default RentalOrder;
