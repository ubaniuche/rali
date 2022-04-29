'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'
import DRONE from '../../constants/Drone'

export default (sequelize, DataTypes) => {
    class Drones extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            Drones.hasMany(models.LoadedItems, { foreignKey: "drone_id", as: "loaded_items" });
            Drones.hasMany(models.BatteryAudit, { foreignKey: "drone_id", as: "battery_audit" });
            Drones.belongsTo(models.DroneModels, { foreignKey: "model_id", as: "model" });
        }
    }
    Drones.init({
        serial_number: DataTypes.STRING,
        model_id: DataTypes.INTEGER,
        battery_level: DataTypes.INTEGER,
        status: DataTypes.ENUM(DRONE.STATE),
    }, {
        sequelize,
        modelName: "Drones",
        tableName: DB_TABLE.DRONES,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return Drones;
};