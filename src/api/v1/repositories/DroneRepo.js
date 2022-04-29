import db from "../database/models"

export default class DroneRepo {

    static async create(data = {}, transaction) {
        return await db.Drones.create(data, {transaction})
    }

    static async findOne(conditions = {}, options = {}) {
        return await db.Drones.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}) {
        return await db.Drones.findAndCountAll({where: conditions, ...options})
    }

    static async count(conditions = {}) {
        return await db.Drones.count({where: conditions})
    }
}