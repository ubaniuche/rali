import CustomError from "./CustomError";
import STATUS_CODES from "../../constants/StatusCodes";


class BadRequestError extends CustomError {
    constructor(message = "Bad Request", metaData = {}) {
        super(STATUS_CODES.BAD_REQUEST, message, metaData);
    }
}

export default BadRequestError;