import STATUS_CODES from '../constants/StatusCodes'
import ServerResponse from '../helpers/ServerResponse'
import { BatteryAuditService } from '../services'
import BaseController from './BaseController'

export default class BatteryAuditController extends BaseController {

    static async getBatteryAudits (req, res) {
        try{

            const drones = await BatteryAuditService.findBatteryAudits({drone_id: req.params.drone_id})

            return ServerResponse.success(req, res, STATUS_CODES.OK, drones, "Battery audits/history for drone found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }
}