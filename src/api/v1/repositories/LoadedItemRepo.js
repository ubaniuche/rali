import db from '../database/models'

export default class LoadedItemRepo {
    
    static async create(data = {}, transaction) {
        return await db.LoadedItems.create(data, {transaction})
    }

    static async findOne(conditions = {}, options = {}) {
        return await db.LoadedItems.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}) {
        return await db.LoadedItems.findAndCountAll({where: conditions, ...options})
    }

    static async deleteAll(conditions = {}, options = {}, transaction) {
        return await db.LoadedItems.destroy({where: conditions, ...options}, {transaction})
    }
}