import STATUS_CODES from '../constants/StatusCodes'
import ServerResponse from '../helpers/ServerResponse'
import { DroneService } from '../services'
import BaseController from './BaseController'

export default class DroneController extends BaseController {
    static async addDrone (req, res) {
        const transaction = await DroneController.getTransaction()

        try {

            const drone = await DroneService.addDrone(req.body, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.CREATED, drone, "Drone added successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }

    static async getDrone (req, res) {
        try{

            const drone = await DroneService.findDrone({id: req.params.drone_id})

            return ServerResponse.success(req, res, STATUS_CODES.OK, drone, "Drone found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async getDrones (req, res) {
        try{

            const drones = await DroneService.findDrones()

            return ServerResponse.success(req, res, STATUS_CODES.OK, drones, "Drones found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async getAvailableDrones (req, res) {
        try{

            const drones = await DroneService.findAvailableDrones()

            return ServerResponse.success(req, res, STATUS_CODES.OK, drones, "Available drones found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async updateDrone (req, res) {
        const transaction = await DroneController.getTransaction()

        try {
            const drone = await DroneService.updateDrone({id: req.params.drone_id}, req.body, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.OK, drone, "Drone updated successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }
}