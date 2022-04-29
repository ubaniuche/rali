'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'

export default (sequelize, DataTypes) => {
    class LoadedItems extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            LoadedItems.belongsTo(models.Drones, { foreignKey: "drone_id", as: "drone" });
            LoadedItems.belongsTo(models.Medications, { foreignKey: "medication_id", as: "medication" });
            LoadedItems.belongsTo(models.DroneLoad, { foreignKey: "drone_id", as: "loaded_items" });
        }
    }
    LoadedItems.init({
        drone_id: DataTypes.INTEGER,
        medication_id: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "LoadedItems",
        tableName: DB_TABLE.LOADED_ITEMS,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return LoadedItems;
};