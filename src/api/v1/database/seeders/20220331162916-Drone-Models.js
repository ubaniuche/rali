"use strict";

const DB_TABLE = require('../../constants/DbTable')
const DRONE_MODELS = require('../../constants/DroneModels')

const WEIGHT_CLASS_AND_LIMITS = [
    {name: DRONE_MODELS.LIGHTWEIGHT, weight_limit: DRONE_MODELS.LIGHTWEIGHTLIMIT},
    {name: DRONE_MODELS.MIDDLEWEIGHT, weight_limit: DRONE_MODELS.MIDDLEWEIGHTLIMIT},
    {name: DRONE_MODELS.CRUISERWEIGHT, weight_limit: DRONE_MODELS.CRUISERWEIGHTLIMIT},
    {name: DRONE_MODELS.HEAVYWEIGHT, weight_limit: DRONE_MODELS.HEAVYWEIGHTLIMIT},
]

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(DB_TABLE.DRONE_MODELS, WEIGHT_CLASS_AND_LIMITS, {
            returning: ['name'],
            ignoreDuplicates: true
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(DB_TABLE.DRONE_MODELS, null, {});
    },
};