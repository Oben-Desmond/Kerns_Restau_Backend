import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db";
import MenuItem from "./MenuItem.model";


const Image = sequelize.define('Image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    //forein key
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreinKey: true,
        references: {
            model: 'MenuItem',
            key: 'id'
        }
    }
});

Image.belongsTo(MenuItem, { foreignKey: 'itemId' });
sequelize.sync();


export default Image;