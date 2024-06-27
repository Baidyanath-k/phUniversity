import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../appError/appError";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "./catchAsync";

const authValidate = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        // if the token is sent form client 
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized user!!")
        };

        // check if the token is valid
        jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
            if (err) {
                throw new AppError(StatusCodes.UNAUTHORIZED, "You send invalid token!!")
            };

            const role = (decoded as JwtPayload).role;
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(StatusCodes.UNAUTHORIZED, "You are not same token!!")
            };
            req.user = decoded as JwtPayload;
            next();
        });
    });
};
export default authValidate;