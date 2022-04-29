'use strict';
const DB_TABLE = require('../../constants/DbTable')
const DRONE = require('../../constants/Drone')

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable(DB_TABLE.DRONES, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        serial_number: {
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        model_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          refernce: {
            model: {
              tableName: DB_TABLE.DRONE_MODELS,
              schema: "public",
            },
            key: "id",
          },
        },
        battery_level: {
          type: Sequelize.INTEGER,
          defaultValue: 100,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM(DRONE.STATE),
          defaultValue: DRONE.IDLE,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "created_at",
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "updated_at",
        },
      }, {transaction});
      
      await queryInterface.addIndex(DB_TABLE.DRONES, ['id'], { transaction });

      await transaction.commit();
    
    } catch (err) {
     
      await transaction.rollback();
     
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DB_TABLE.DRONES);
  }
};