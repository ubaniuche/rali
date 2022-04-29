import AssociationManager from '../helpers/AssociationsManager'
import { BadRequestError, NoContentError, NotFoundError } from '../helpers/exceptions'
import { DroneRepo } from '../repositories'
import { DroneModelService, LoadingService } from '.'
import DRONE from '../constants/Drone'
import { Op } from 'sequelize'


export default class DroneService {

    /**
     * @name addDrone
     * @static
     * @async
     * @param {object} data - {serial_number, model_id}
     * @returns {Object} {id, serial_number, model_id, battery_level, status}
     */
    static async addDrone(data = {}, transaction) {

        await DroneModelService.findDroneModel({id: data.model_id}, {})

        const drone = await DroneRepo.create(data, transaction)

        await LoadingService.createDroneLoad({drone_id: drone.id}, transaction)

        return drone
    }

    /**
     * @name findDrone
     * @static
     * @async
     * @param {object} conditions - {id}
     * @param {object} options - {}
     * @returns {Object} {id, serial_number, model_id, battery_level, status}
     */
    static async findDrone(conditions = {}, options = AssociationManager.droneAssociation(), validate = true) {

        const drone = await DroneRepo.findOne(conditions, options)

        if(validate && !drone) throw new NotFoundError("Drone not found")

        return drone
    }

    /**
     * @name findDrones
     * @static
     * @async
     * @param {object} conditions
     * @param {object} options - {}
     * @returns {Array} [{id, serial_number, model_id, battery_level, status}]
     */
    static async findDrones(conditions = {}, options = AssociationManager.droneAssociation(), validate = true) {
        const drones = await DroneRepo.findAll(conditions, options)

        if (validate && drones.count == 0) throw new NoContentError("Drones not found")

        return drones
    }

    /**
     * @name findAvailableDrones
     * @static
     * @async
     * @param {object} conditions
     * @param {object} options - {}
     * @returns {Array} [{id, serial_number, model_id, battery_level, status}]
     */
    static async findAvailableDrones() {
        const drones = await DroneRepo.findAll({
            status: DRONE.LOADING,
            battery_level: {[Op.gte]: 25}
        })

        if (drones.count == 0) throw new NoContentError("No drone available for loading")

        return drones
    }

    /**
     * @name updateDrone
     * @static
     * @async
     * @param {object} conditions
     * @param {object} data - {model_id, battery_level, status}
     * @returns {object} {id, serial_number, model_id, battery_level, status}
     */
    static async updateDrone(conditions = {}, data = {}, transaction) {
        const drone = await this.findDrone(conditions, {})
        
        if (data.model_id) await DroneModelService.findDroneModel({ id: data.model_id })
        
        if (data.status && drone.battery_level <= 25) throw new BadRequestError(`Drone battery_level level too low to be assigned loading state (${drone.battery_level}%)`)

        await drone.update(data, {transaction})

        return drone
    }

    /**
     * @name countDrones
     * @static
     * @async
     * @param {object} conditions
     * @returns {number} 
     */
    static async countDrones(conditions = {}) {
        return await DroneRepo.count(conditions)
    }
}