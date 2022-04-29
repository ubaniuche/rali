import db from '../database/models'

export default class MedicationRepo {
    
    static async create(data = {}, transaction) {
        return await db.Medications.create(data, {transaction})
    }

    static async findOne(conditions = {}, options = {}) {
        return await db.Medications.findOne({where: conditions, ...options})
    }

    static async findAll(conditions = {}, options = {}) {
        return await db.Medications.findAndCountAll({where: conditions, ...options})
    }

    static async count(conditions = {}) {
        return await db.Medications.count({where: conditions})
    }
}