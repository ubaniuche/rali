import { validationResult } from "express-validator";
// import ServerErrorHandler from "../../helper/ServerErrorHandler";
import fs from "fs";
import ServerResponse from "../../helpers/ServerResponse";

/**
 * @name CheckForErrors
 * @param {Object} request express response object
 * @param {Object} response express response object
 * @param {Function} next next function to return
 * @returns {JSON} JSON response with status and response information
 */
export default (request, response, next) => {
    const errors = {};

    /**
     * @name ErrorFormatter
     * @param {Object} request express response object
     * @returns {JSON} JSON response with status and response information
     */
    const ErrorFormatter = ({ location, msg, param }) => {

        if (!Object.keys(errors).includes(location)) {
            errors[`${location}`] = {};
        }

        errors[`${location}`][`${param}`] = msg;

        return errors;
    };

    const validationResults = validationResult(request).array({ onlyFirstError: true });

    validationResults.forEach((resultObject) => ErrorFormatter(resultObject));

    if (Object.keys(errors).length > 0) {

        ServerResponse.failure(request, response, {
            statusCode: 400,
            message: "Bad Request",
            metaData: {...errors },
        });

    } else {
        next();
    }
};