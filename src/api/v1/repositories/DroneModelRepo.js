import db from '../database/models'

export default class DroneModelRepo {

    static async create(data = {}, transaction) {
        return await db.DroneModels.create(data, {transaction})
    }

    static async createMany(data = [], transaction) {
        return await db.DroneModels.bulkCreate(data, {transaction})
    }

    static async findOne(conditions = {}, options = {}, validate = true) {
        return await db.DroneModels.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}, validate = true) {
        return await db.DroneModels.findAndCountAll({where: conditions, ...options})
    }
        
    static async count(conditions = {}) {
        return (await db.DroneModels.count({where: conditions})).toJSON()
    }
}