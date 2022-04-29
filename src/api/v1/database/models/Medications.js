'use strict';
import { Model } from 'sequelize';
import DB_TABLE from '../../constants/DbTable'

export default (sequelize, DataTypes) => {
    class Medications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
            Medications.hasMany(models.LoadedItems, { foreignKey: "medication_id", as: "loaded_medications" });
        }
    }
    Medications.init({
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        image_url: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Medications",
        tableName: DB_TABLE.MEDICATIONS,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return Medications;
};