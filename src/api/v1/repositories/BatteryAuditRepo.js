import db from "../database/models"

export default class BatteryAuditRepo {

    static async create(data = {}) {
        return await db.BatteryAudit.create(data)
    }

    static async createMany(data = [], options = {}) {
        return await db.BatteryAudit.bulkCreate(data, options)
    }

    static async findOne(conditions = {}, options = {}) {
        return await db.BatteryAudit.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}) {
        return await db.BatteryAudit.findAndCountAll({where: conditions, ...options})
    }
}