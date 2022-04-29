import STATUS_CODES from "../../constants/StatusCodes";
import CustomError from "./CustomError";

class NotFoundError extends CustomError {
    constructor(message = "Not Found") {
        super(STATUS_CODES.NOT_FOUND, message);
    }
}

export default NotFoundError;