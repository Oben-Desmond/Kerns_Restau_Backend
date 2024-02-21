import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const PurchaseOrder = sequelize.define("PurchaseOrder", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchase_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

export default PurchaseOrder;
