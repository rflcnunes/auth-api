import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
// import UserException from "../exception/UserException.js";

import * as secrets from "../../../config/constants/secrets.js";

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

    async getAccessToken(req) {
        try {
            const { email, password } = req.body;
            this.validateAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {id: user.id, name: user.name, email: user.email};
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: '1h'});
            
            return {
                status: httpStatus.SUCCESS,
                accessToken,
            }
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }

    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new Error(
                httpStatus.BAD_REQUEST,
                "Email and password are required"
            );
        }
    }

    async validatePassword(password, hashPassword) {
        if (!(await bcrypt.compare(password, hashPassword))) {
            throw new Error(
                httpStatus.UNAUTHORIZED,
                "Invalid password"
            );
        }
    }

}

export default new UserService();