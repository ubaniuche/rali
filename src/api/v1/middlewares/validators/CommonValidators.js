import {check, body, query, param} from 'express-validator'
import { DroneService, MedicationService } from '../../services';

export default class CommonValidators {

    /**
     * optional input validator to ensure that a field is a number
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
     static checkBatteryLevelOptional(item) {
        return check(item)
            .optional()
            .trim()
            .isInt({ min: 1, max: 100 })
            .withMessage(`${item} must be an integer between 1 - 100`);
    }

    /**
     * compulsory input validator to ensure that image feild exist
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
     static checkImage(field) {
        return body(field)
            .exists()
            .withMessage(`${field} is missing`)
            .notEmpty()
            .withMessage(`${field} must contain an image of either jpeg or png type`);
    }

    /**
     * compulsory input validator to ensure that field is a string and exist in the required enum
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkEnumString(field, values) {
        return check(`${field}`)
            .exists()
            .withMessage(`${field} is missing`)
            .isString()
            .withMessage(`${field} must be a string`)
            .customSanitizer((value) => this.makeLowerCase(value))
            .custom((value) => {
                return this.checkValueExistInEnum(value, values)
            });
    }

    /**
     * optional input validator to ensure that field is a string and exist in the required enum
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkEnumStringOptional(field, values) {
        return check(`${field}`)
            .optional()
            .isString()
            .withMessage(`${field} must be a string`)
            .customSanitizer((value) => this.makeLowerCase(value))
            .custom((value) => {
                return this.checkValueExistInEnum(field, value, values)
            });
    }

    /**
     * compulsory input validator to ensure that medication code is a string, unique and does not contain any unwanted characters
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkMedicationCode(item) {
        return check(item)
            .isString()
            .withMessage(`${item} must be a string`)
            .matches(/^[A-Z0-9 _]+$/)
            .withMessage(`${item} can only contain capital letters, numbers and "_"`)
            .bail()
            .custom(value => { return this.checkMedCodeUniqueness(value) })
    }

    /**
     * compulsory input validator to ensure that medication name is a string, unique and does not contain any unwanted characters
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkMedicationName(item) {
        return check(item)
            .isString()
            .withMessage(`${item} must be a string`)
            .matches(/^[A-Za-z0-9 -_]+$/)
            .withMessage(`${item} can only contain letters, numbers and "_", "-"`)
            .bail()
            .customSanitizer((value) => this.makeLowerCase(value))
            .custom(value => { return this.checkMedNameUniqueness(value) })
    }

    /**
     * compulsory input validator to ensure that drone serial number is a string, unique, does not contain any unwanted characters and is within 1 - 100 characters
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkDroneSerialNumber(item) {
        return check(item)
            .isString()
            .withMessage(`${item} must be a string`)
            .isLength({min: 1, max: 100})
            .withMessage(`${item} must be within 1 and 100 characters`)
            .bail()
            .custom(value => { return this.checkDroneSerialNumberUniqueness(value) })
    }

    /**
     * optional input validator to ensure that drone serial number is a string, unique, does not contain any unwanted characters and is within 1 - 100 characters
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkDroneSerialNumberOptional(item) {
        return check(item)
            .optional()
            .isString()
            .withMessage(`${item} must be a string`)
            .isLength({min: 1, max: 100})
            .withMessage(`${item} must be within 1 and 100 characters`)
            .bail()
            .custom(value => { return this.checkDroneSerialNumberUniqueness(value) })
    }

    /**
     * compulsory input validator to ensure that a field is a number
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkNumber(item) {
        return check(item)
            .trim()
            .isInt({ min: 1 })
            .withMessage(`${item} must be at least 1 and an integer`);
    }

    /**
     * optional input validator to ensure that a field is a number
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkNumberOptional(item) {
        return check(item)
            .optional()
            .trim()
            .isInt({ min: 1 })
            .withMessage(`${item} must be at least 1 and an integer`);
    }

    /**
     * compulsory input validator to ensure that a param field is a number
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkParamIsInt(item) {
        return param(item)
            .trim()
            .isInt({ min: 1 })
            .withMessage(`${item} must be at least 1 and an integer`);
    }

    /**
     * optional input validator to ensure that a query field exist
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
    static checkQueryStringOptional(item) {
        return query(item)
            .optional()
            .isString()
            .withMessage(`${item} must be a string`)
            .isLength({min: 1})
            .withMessage(`${item} must contain at least 1 character`)
    }

    /**
     * compulsory input validator to ensure that a field should not exist
     * @param {string} field
     * @returns {function} call to a Check API middleware
     * @memberof CommonValidator
     */
     static shouldNotExistCheck(field) {
        return body(`${field}`)
            .optional()
            .not()
            .exists()
            .withMessage(`${field} should not exist in the request body`);
    }

    /**
     * function to convert field to lowercase
     * @param {string} field
     * @returns {string} returns lowercase for feild
     * @memberof CommonValidator
     */
    static makeLowerCase(value) {
        
        if (value !== "") return value.toLowerCase();

        return value;
    }
    
    /**
     * function to check if drone serial number is unique
     * @param {string} field
     * @returns {boolean} returns boolean value
     * @memberof CommonValidator
     */
    static async checkDroneSerialNumberUniqueness(serial_number) {

        const count = await DroneService.countDrones({serial_number})

        if (count > 0) throw new Error('Drone with serial number exist')

        return true
    }
    
    /**
     * function to check if medication name is unique
     * @param {string} field
     * @returns {boolean} returns boolean value
     * @memberof CommonValidator
     */
    static async checkMedNameUniqueness(name) {
        const count = await MedicationService.countMedication({name})

        if (count > 0) throw new Error('Medication with name exist')

        return true
    }

    /**
     * function to check if medication code is unique
     * @param {string} field
     * @returns {boolean} returns boolean value
     * @memberof CommonValidator
     */
    static async checkMedCodeUniqueness(code) {
        const count = await MedicationService.countMedication({code})

        if (count > 0) throw new Error('Medication with code exist')
    }
    
    /**
     * function to check if exist in an array
     * @param {string} field
     * @returns {boolean} returns boolean value
     * @memberof CommonValidator
     */
    static checkValueExistInEnum(field, value, values) {
        
        if (values.indexOf(value) < 0) throw new Error(`invalid entry ${field}. Must be one of the following(${values})`);
        
        return true
    }
}