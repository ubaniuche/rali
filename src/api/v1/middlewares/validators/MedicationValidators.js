import emptyBody from "../CheckEmptyBody";
import CheckForErrors from "./CheckForErrors";
import CommonValidators from "./CommonValidators";

export default class MedicationValidator extends CommonValidators {

    static checkAddMedication() {
        return [
            MedicationValidator.checkMedicationName("name"),
            MedicationValidator.checkNumber("weight"),
            MedicationValidator.checkMedicationCode("code"),
            MedicationValidator.shouldNotExistCheck("id"),
            MedicationValidator.shouldNotExistCheck("image_url"),
            CheckForErrors,
            emptyBody,
        ];
    }

    static checkGetMedication() {
        return [
            MedicationValidator.checkParamIsInt("medication_id"),
            CheckForErrors,
        ];
    }
}