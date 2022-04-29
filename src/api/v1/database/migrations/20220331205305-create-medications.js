'use strict';
const DB_TABLE = require('../../constants/DbTable')

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable(DB_TABLE.MEDICATIONS, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        weight: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        image_url: {
          type: Sequelize.STRING,
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
        
      await queryInterface.addIndex(DB_TABLE.MEDICATIONS, ['id'], { transaction });

      await transaction.commit();
    
    } catch (err) {
     
      await transaction.rollback();
     
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DB_TABLE.MEDICATIONS);
  }
};
