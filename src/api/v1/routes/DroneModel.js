import express from 'express'
import { DroneModelController, BatteryAuditController } from '../controllers'

const route = express.Router()

route.get('/', DroneModelController.getDroneModels)

export default route