import express from 'express'
import { MedicationController } from '../controllers'
import FileUploader from '../middlewares/FileUploader'
import MedicationValidator from '../middlewares/validators/MedicationValidators'

const route = express.Router()

route.post(
    '/',
    MedicationValidator.checkAddMedication(),
    FileUploader.uploadSingle('image'),
    MedicationController.addMedication
)

route.get('/:medication_id', MedicationValidator.checkGetMedication(), MedicationController.getMedication)

route.get('/', MedicationController.getMedications)

export default route