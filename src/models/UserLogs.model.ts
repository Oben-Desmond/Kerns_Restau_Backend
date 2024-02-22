import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const UserLog = sequelize.define("UserLog", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

UserLog.sync({
  alter: true,
});

export default UserLog;
