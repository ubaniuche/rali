import CustomError from "./CustomError";
import STATUS_CODES from "../../constants/StatusCodes";

export default class NoContentError extends CustomError {
    constructor(message = "No content found") {
        super(STATUS_CODES.OK, message, []);
    }
}