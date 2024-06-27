import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../appError/appError";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "./catchAsync";


const authValidate = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        // if the token is sent form client 
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized user!!")
        };

        // check if the token is valid
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const { userId, role, iat } = decoded;


        const user = await User.isUserExistsByCustomID(userId);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!!");
        };

        // checking if the user is deleted
        const isDeletedUser = user?.isDeleted;

        if (isDeletedUser) {
            throw new AppError(StatusCodes.FORBIDDEN, "This user is already deleted!!")
        };

        // checking if the user status
        const userStatus = user?.status;
        if (userStatus === 'blocked') {
            throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!!")
        };

        // jwt time and password update time check
        if (user.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are provide token after password change!!")
        }

        // user role check
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not same token!!")
        };
        req.user = decoded as JwtPayload;
        next();
    });
};
export default authValidate;