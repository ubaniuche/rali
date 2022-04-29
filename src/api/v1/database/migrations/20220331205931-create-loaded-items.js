'use strict';
const DB_TABLE = require('../../constants/DbTable')

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable(DB_TABLE.LOADED_ITEMS, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        drone_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          refernce: {
            model: {
              tableName: DB_TABLE.DRONES,
              schema: "public",
            },
            key: "id",
          },
        },
        medication_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          refernce: {
            model: {
              tableName: DB_TABLE.MEDICATIONS,
              schema: "public",
            },
            key: "id",
          },
        },
        weight: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
      await queryInterface.addIndex(DB_TABLE.LOADED_ITEMS, ['id', 'drone_id'], { transaction });

      await transaction.commit();
    
    } catch (err) {
     
      await transaction.rollback();
     
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DB_TABLE.LOADED_ITEMS);
  }
};
