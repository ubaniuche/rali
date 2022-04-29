import db from "../database/models"

export default class DroneLoadRepo {

    static async create(data = {}, transaction) {
        return await db.DroneLoad.create(data, {transaction})
    }

    static async findOne(conditions = {}, options = {}) {
        return await db.DroneLoad.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}) {
        return await db.DroneLoad.findAndCountAll({where: conditions, ...options})
    }
}