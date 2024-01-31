import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db";


const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    table_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    kitchen_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    finance_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    menu_items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }

});

sequelize.sync();


export default Order;