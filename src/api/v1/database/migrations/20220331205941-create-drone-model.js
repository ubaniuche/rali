'use strict';
const DB_TABLE = require('../../constants/DbTable')

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable(DB_TABLE.DRONE_MODELS, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        weight_limit: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      }, {transaction});
        
      await queryInterface.addIndex(DB_TABLE.DRONE_MODELS, ['id'], { transaction });

      await transaction.commit();
    
    } catch (err) {
     
      await transaction.rollback();
     
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DB_TABLE.DRONE_MODELS);
  }
};
