import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
// import UserException from "../exception/UserException.js";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateDataRequest(req);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    }

    validateDataRequest(email) {
        if (!email) {
            throw new Error(
                httpStatus.BAD_REQUEST, 
                "Email is required"
            );
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error(
                httpStatus.NOT_FOUND,
                "User not found"
            );
        }
    }
}

export default new UserService();