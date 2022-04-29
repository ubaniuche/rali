'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'

export default (sequelize, DataTypes) => {
    class BatteryAudit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            BatteryAudit.belongsTo(models.Drones, { foreignKey: "drone_id", as: "drone" });
        }
    }
    BatteryAudit.init({
        drone_id: DataTypes.INTEGER,
        battery_level: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "BatteryAudit",
        tableName: DB_TABLE.BATTERY_AUDIT,
        createdAt: "created_at",
        updatedAt: false,
    });

    return BatteryAudit;
};