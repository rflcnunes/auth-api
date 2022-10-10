import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import * as secrets from '../constants/secrets.js';
import * as httpStatus from '../constants/httpStatus.js';
import { access } from 'fs';

const bearer = 'Bearer ';

const emptySpace = " ";

export default async (req, res, next) => {
    try {
        let { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        let accessToken = authorization;

        if (accessToken.includes(emptySpace)) {
            accessToken = accessToken.replace(emptySpace)[1];
        } else {
            accessToken = authorization;
        }

        const decoded = await promisify(jwt.verify)(accessToken, secrets.API_SECRET);

        req.authUser = decoded.authUser;

        return next();
    } catch (err) {
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({ 
            status: status, 
            message: err.message 
        });
    }
}