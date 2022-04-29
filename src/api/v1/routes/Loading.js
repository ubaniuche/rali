import express from 'express'
import { LoadingController } from '../controllers'
import LoadingValidator from '../middlewares/validators/LoadingValidators'

const route = express.Router()

route.post(
    '/drones/:drone_id',
    LoadingValidator.checkAddItem(),
    LoadingController.addItem
)

route.get(
    '/drones/:drone_id',
    LoadingValidator.checkGetDroneLoad(),
    LoadingController.getDroneLoad
)

route.get(
    '/drones/:drone_id/items',
    LoadingValidator.checkGetItems(),
    LoadingController.getDroneLoadItems
)

route.get(
    '/drones/:drone_id/items/:item_id',
    LoadingValidator.checkGetItems(),
    LoadingController.getDroneLoadItem
)

route.delete(
    '/drones/:drone_id/items',
    LoadingValidator.checkGetItems(),
    LoadingController.offloadAllItems
)

route.delete(
    '/drones/:drone_id/items/:item_id',
    LoadingValidator.checkGetItem(),
    LoadingController.offloadItem
)

export default route