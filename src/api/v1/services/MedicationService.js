import { NotFoundError } from '../helpers/exceptions'
import { MedicationRepo } from '../repositories'

export default class MedicationService {
    
    /**
     * @name addMedication
     * @static
     * @async
     * @param {object} data - {name, code, weight, image_url}
     * @returns {object} {id, name, code, weight, image_url}
     */
    static async addMedication(data = {}, transaction) {
        return await MedicationRepo.create(data, transaction)
    }

    /**
     * @name findMedication
     * @static
     * @async
     * @param {object} conditions
     * @param {object} options
     * @returns {object} {id, name, code, weight, image_url}
     */
    static async findMedication(conditions = {}, options = {}, validate = true) {
        const medication = await MedicationRepo.findOne(conditions, options)

        if(validate && !medication) throw new NotFoundError("Medication not found")

        return medication.toJSON()
    }

    /**
     * @name findMedications
     * @static
     * @async
     * @param {object} conditions
     * @param {object} options
     * @returns {Array} [{id, name, code, weight, image_url}]
     */
    static async findMedications(conditions = {}, options = {}, validate = true) {
        const medications = await MedicationRepo.findAll(conditions, options)

        if (validate && medications.length == 0) throw new NoContentError("Medications not found")

        return medications
    }

    /**
     * @name updateMedication
     * @static
     * @async
     * @param {object} conditions
     * @param {object} data
     * @returns {Array} {id, name, code, weight, image_url}
     */
    static async updateMedication(conditions = {}, data = {}, transaction) {
        const medication = await this.findMedication(conditions)

        await medication.update(data, transaction)

        return medication
    }

    /**
     * @name countMedication
     * @static
     * @async
     * @param {object} conditions
     * @returns {number}
     */
    static async countMedication(conditions = {}) {
        return await MedicationRepo.count(conditions)
    }
}