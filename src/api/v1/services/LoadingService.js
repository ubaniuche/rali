import { BadRequestError, NotFoundError } from '../helpers/exceptions'
import { DroneLoadRepo } from '../repositories'
import { DroneService, LoadedItemService, MedicationService } from '.'
import DRONE from '../constants/Drone'
import AssociationManager from '../helpers/AssociationsManager'

export default class LoadingService {

    /**
     * @name createDroneLoad
     * @static
     * @async
     * @param {object} data - {drone_id, weight}
     * @returns {object} {id, drone_id, weight}
     */
    static async createDroneLoad (data = {}, transaction) {
        return await DroneLoadRepo.create(data, transaction)
    }

    /**
     * @name loadItem
     * @static
     * @async
     * @param {object} data - {drone_id, medication_id, quantity}
     * @returns {object} {drone_load}
     */
    static async loadItem(data = {}, transaction) {

        const drone = await DroneService.findDrone({id: data.drone_id})

        if (drone.status != DRONE.LOADING) throw new BadRequestError("Drone unavailable for loading")

        const medication = await MedicationService.findMedication({id: data.medication_id})

        const droneLoad = await this.findDroneLoad({drone_id: drone.id}, {})

        const medTotalWeight = medication.weight * data.quantity

        const newDroneLoadWeight = medTotalWeight + droneLoad.weight

        if (newDroneLoadWeight > drone.model.weight_limit) throw new BadRequestError(`Exceeded drone weight limit(${drone.model.weight_limit}g).`)
        
        if (newDroneLoadWeight == drone.model.weight_limit) await drone.update({status: DRONE.LOADED}, transaction)
        
        await droneLoad.update({weight: newDroneLoadWeight}, {transaction})

        const loadedItemData = {
            drone_id: drone.id,
            medication_id: medication.id,
            weight: medication.weight,
            quantity: data.quantity
        }

        await LoadedItemService.loadItem(loadedItemData, transaction)

        return droneLoad
    }

    /**
     * @name findDroneLoad
     * @static
     * @async
     * @param {object} conditions
     * @returns {object} {drone_load}
     */
    static async findDroneLoad(conditions = {}, options = AssociationManager.droneLoadAssociation(), validate = true) {

        const droneLoad = await DroneLoadRepo.findOne(conditions, options)

        if(validate && !droneLoad) throw new NotFoundError("Drone load not found")

        return droneLoad
    }

    /**
     * @name offloadItem
     * @static
     * @async
     * @param {object} data {drone_id, item_id}
     * @returns {object} {drone_load}
     */
    static async offloadItem(data = {}, transaction) {

        const droneLoad = await this.findDroneLoad({drone_id: data.drone_id}, {})

        const item = await LoadedItemService.findItem({drone_id: data.drone_id, id: data.item_id}, {})

        const weight = item.quantity * item.weight

        await item.destroy({transaction})

        await droneLoad.update({weight: droneLoad.weight - weight}, {transaction})

        return droneLoad

    }

    /**
     * @name offloadAllItems
     * @static
     * @async
     * @param {object} data {drone_id}
     * @returns {object} {drone_load}
     */
    static async offloadAllItems(data = {}, transaction) {

        const droneLoad = await this.findDroneLoad({drone_id: data.drone_id}, {})

        await LoadedItemService.offloadAllItems({drone_id: data.drone_id}, transaction)

        await droneLoad.update({weight: 0}, {transaction})

        return droneLoad

    }
}