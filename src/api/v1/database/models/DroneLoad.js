'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'

export default (sequelize, DataTypes) => {
    class DroneLoad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            DroneLoad.belongsTo(models.Drones, { foreignKey: "drone_id", as: "drone" });
            DroneLoad.hasMany(models.LoadedItems, { sourceKey: "drone_id", foreignKey: "drone_id", as: "loaded_items" });
        }
    }
    DroneLoad.init({
        drone_id: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "DroneLoad",
        tableName: DB_TABLE.DRONE_LOAD,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return DroneLoad;
};