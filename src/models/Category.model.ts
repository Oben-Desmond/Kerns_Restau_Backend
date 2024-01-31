import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";


const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});


sequelize.sync();

export default Category;