import db from "../database/models";
import { BadRequestError } from "../helpers/exceptions";

class BaseController {
    static getTransaction = async() => {
        return await db.sequelize.transaction();
    };
    static convertToBoolean(value) {
        if (value === "true") return true;
        else if (value === "false") return false;
        throw new BadRequestError("status must be true or false");
    }
}

export default BaseController;