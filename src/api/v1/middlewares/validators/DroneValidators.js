import DRONE from "../../constants/Drone";
import emptyBody from "../CheckEmptyBody";
import CheckForErrors from "./CheckForErrors";
import CommonValidators from "./CommonValidators";

export default class DroneValidator extends CommonValidators {

    static checkAddDrone() {
        return [
            DroneValidator.checkDroneSerialNumber("serial_number"),
            DroneValidator.checkNumber("model_id"),
            DroneValidator.checkEnumStringOptional("status", DRONE.STATE),
            DroneValidator.shouldNotExistCheck("id"),
            CheckForErrors,
            emptyBody,
        ];
    }

    static checkGetDrone() {
        return [
            DroneValidator.checkParamIsInt("drone_id"),
            CheckForErrors,
        ];
    }

    static checkUpdateDrone() {
        return [
            DroneValidator.checkParamIsInt("drone_id"),
            DroneValidator.shouldNotExistCheck("id"),
            DroneValidator.checkBatteryLevelOptional("battery_level"),
            DroneValidator.checkDroneSerialNumberOptional("serial_number"),
            DroneValidator.checkNumberOptional("model_id"),
            DroneValidator.checkEnumStringOptional("status", DRONE.STATE),
            CheckForErrors,
            emptyBody,
        ];
    }

}