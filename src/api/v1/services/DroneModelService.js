import { NotFoundError } from "../helpers/exceptions"
import { DroneModelRepo } from "../repositories"

export default class DroneModelService {

    /**
     * @name addDroneModel
     * @static
     * @async
     * @param {object} data - {name, weight}
     * @returns {Object} {id, name, weight_limit}
     */
    static async addDroneModel(data = {}, transaction) {

        const drone = await DroneModelRepo.create(data, transaction)

        return drone
    }

    /**
     * @name findDroneModel
     * @static
     * @async
     * @param {object} conditions - {name, weight}
     * @param {object} options - {}
     * @returns {Object} {id, name, weight_limit}
     */
    static async findDroneModel(conditions = {}, options = {}, validate = true) {
        
        const model = await DroneModelRepo.findOne(conditions, options)

        if(validate && !model) throw new NotFoundError('Drone model not found')

        return model
    }

    /**
     * @name findDroneModels
     * @static
     * @async
     * @param {object} conditions - {name, weight}
     * @param {object} options - {}
     * @returns {Array} {id, name, weight_limit}
     */
    static async findDroneModels(conditions = {}, options = {}, validate = true) {
        
        const models = await DroneModelRepo.findAll(conditions, options)

        if (validate && models.count == 0) throw new NoContentError('Drone models not found')

        return models
    }

}