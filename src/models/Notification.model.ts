import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Notification = sequelize.define("Notifications", {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_read: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

Notification.sync({
  alter: true,
});

export default Notification;
