import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const RentalItemLogs = sequelize.define("RentalItemLogs", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

RentalItemLogs.sync({
  alter: true,
});

export default RentalItemLogs;
