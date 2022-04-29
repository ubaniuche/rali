import ServerResponse from '../helpers/ServerResponse'
import BaseController from './BaseController'
import STATUS_CODES from '../constants/StatusCodes'
import { MedicationService } from '../services'


export default class MedicationController extends BaseController {
    static async addMedication (req, res) {
        
        const transaction = await MedicationController.getTransaction()

        try {

            const medication = await MedicationService.addMedication(req.body, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.CREATED, medication, "Medication added successfully")
        }
        catch (error) {

            return ServerResponse.failure(req, res, error, transaction)
        }
    }

    static async getMedication (req, res) {
        try{

            const medication = await MedicationService.findMedication({id: req.params.medication_id}, {})

            return ServerResponse.success(req, res, STATUS_CODES.OK, medication, "Medication found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async getMedications (req, res) {
        
        try{

            const medications = await MedicationService.findMedications()

            return ServerResponse.success(req, res, STATUS_CODES.OK, medications, "Medications found")

        }
        catch (error) {
            return ServerResponse.failure(req, res, error)
        }
    }

    static async updateMedication (req, res) {
        const transaction = await this.getTransaction()

        try {
            const medication = await MedicationService.updateMedication({id: req.params.medication_id}, req.body, transaction)

            await transaction.commit()

            return ServerResponse.success(req, res, STATUS_CODES.OK, medication, "Medication updated successfully")
        }
        catch (error) {
            return ServerResponse.failure(req, res, error, transaction)
        }
    }
}