import express from 'express'
import { DroneController, BatteryAuditController } from '../controllers'
import DroneValidator from '../middlewares/validators/DroneValidators'

const route = express.Router()

route.post('/', DroneValidator.checkAddDrone(), DroneController.addDrone)

route.get('/available', DroneController.getAvailableDrones)

route.get('/:drone_id', DroneValidator.checkGetDrone(), DroneController.getDrone)

route.get('/', DroneController.getDrones)

route.patch('/:drone_id', DroneValidator.checkUpdateDrone(), DroneController.updateDrone)

route.get('/:drone_id/battery-audits', DroneValidator.checkGetDrone(), BatteryAuditController.getBatteryAudits)


export default route