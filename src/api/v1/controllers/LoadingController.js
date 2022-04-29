import ServerResponse from '../helpers/ServerResponse'
import { LoadedItemService, LoadingService } from '../services'
import BaseController from './BaseController'
import STATUS_CODES from '../constants/StatusCodes'


export default class LoadingController extends BaseController {
    static async addItem (req, res) {
        const transaction = await LoadingController.getTransaction()

        try {

            req.body.drone_id = req.params.drone_id

            const droneLoad = await LoadingService.loadItem(req.body, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.CREATED, droneLoad, "Item added successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }

    static async getDroneLoad (req, res) {
        
        try{

            const droneLoad = await LoadingService.findDroneLoad({drone_id: req.params.drone_id}, {})

            return ServerResponse.success(req, res, STATUS_CODES.OK, droneLoad, "Drone load found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async getDroneLoadItem (req, res) {
        
        try{

            const loadItems = await LoadedItemService.findItem({drone_id: req.params.drone_id})

            return ServerResponse.success(req, res, STATUS_CODES.OK, loadItems, "Drone load item found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async getDroneLoadItems (req, res) {
        
        try{

            const loadItems = await LoadedItemService.findAllItems({drone_id: req.params.drone_id})

            return ServerResponse.success(req, res, STATUS_CODES.OK, loadItems, "Drone load items found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async offloadItem (req, res) {
        const transaction = await LoadingController.getTransaction()

        try {

            const droneLoad = await LoadingService.offloadItem(req.params, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.OK, droneLoad, "Item offloaded successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }

    static async offloadAllItems (req, res) {
        const transaction = await LoadingController.getTransaction()

        try {

            const droneLoad = await LoadingService.offloadAllItems(req.params, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.OK, droneLoad, "Items offloaded successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }
}