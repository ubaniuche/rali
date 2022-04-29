import STATUS_CODES from '../constants/StatusCodes'
import ServerResponse from '../helpers/ServerResponse'
import { DroneModelService } from '../services'
import BaseController from './BaseController'

export default class DroneModelController extends BaseController {

    static async getDroneModels (req, res) {
        try{

            const droneModels = await DroneModelService.findDroneModels()

            return ServerResponse.success(req, res, STATUS_CODES.OK, droneModels, "Drone models found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }
}