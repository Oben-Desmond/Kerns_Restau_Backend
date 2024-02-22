import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const InventoryItemLogs = sequelize.define("InventoryItemLogs", {
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
  item: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

InventoryItemLogs.sync({
  alter: true,
});

export default InventoryItemLogs;
