import emptyBody from "../CheckEmptyBody";
import CheckForErrors from "./CheckForErrors";
import CommonValidators from "./CommonValidators";

export default class LoadingValidator extends CommonValidators {

    static checkAddItem() {
        return [
            LoadingValidator.checkParamIsInt("drone_id"),
            LoadingValidator.checkNumber("medication_id"),
            LoadingValidator.checkNumber("quantity"),
            LoadingValidator.shouldNotExistCheck("id"),
            CheckForErrors,
            emptyBody,
        ];
    }

    static checkGetItem() {
        return [
            LoadingValidator.checkParamIsInt("drone_id"),
            LoadingValidator.checkParamIsInt("item_id"),
            CheckForErrors
        ];
    }

    static checkGetItems() {
        return [
            LoadingValidator.checkParamIsInt("drone_id"),
            CheckForErrors
        ];
    }

    static checkGetDroneLoad() {
        return [
            LoadingValidator.checkParamIsInt("drone_id"),
            CheckForErrors
        ];
    }
}