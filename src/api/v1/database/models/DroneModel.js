'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'

export default (sequelize, DataTypes) => {
    class DroneModels extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            DroneModels.hasMany(models.Drones, { foreignKey: "model_id", as: "drones" });
        }
    }
    DroneModels.init({
        name: DataTypes.STRING,
        weight_limit: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "DroneModels",
        tableName: DB_TABLE.DRONE_MODELS,
        timestamps: null
    });

    return DroneModels;
};