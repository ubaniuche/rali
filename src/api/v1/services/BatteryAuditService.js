import { NoContentError, NotFoundError } from '../helpers/exceptions'
import { BatteryAuditRepo } from '../repositories'

export default class BatteryAuditService {

    /**
     * @name createAudit
     * @static
     * @async
     * @param {Object} data - {drone_id, battery_level}
     * @returns {object} {id, drone_id, battery_level}
     */
    static async createAudit (data = {}) {

        const audit = await BatteryAuditRepo.create(data)

        return audit
    }

    /**
     * @name createAudits
     * @static
     * @async
     * @param {Array} data - [{drone_id, battery_level}]
     * @returns {Array} [{id, drone_id, battery_level}]
     */
    static async createAudits (data = []) {

        const audits = await BatteryAuditRepo.createMany(data)

        return audits
    }

    /**
     * @name findBatteryAudit
     * @static
     * @async
     * @param {object} conditions - {drone_id}
     * @param {object} options - {}
     * @param {boolean} validate - {}
     * @returns {object} {id, drone_id, battery_level}
     */
    static async findBatteryAudit(conditions = {}, options = {}, validate = true) {

        const audit = await BatteryAuditRepo.findOne(conditions, options)

        if(validate && !audit) throw new NotFoundError("Battery audit/history not found for drone")

        return audit.toJSON()
    }

    /**
     * @name findBatteryAudits
     * @static
     * @async
     * @param {object} conditions - {drone_id}
     * @param {object} options - {}
     * @param {boolean} validate - {}
     * @returns {Array} [{id, drone_id, battery_level}]
     */
    static async findBatteryAudits(conditions = {}, options = {}, validate = true) {
        const audits = await BatteryAuditRepo.findAll(conditions, options)

        if (validate && audits.count == 0) throw new NoContentError("Battery audit/history not found for drone")

        return audits
    }
}