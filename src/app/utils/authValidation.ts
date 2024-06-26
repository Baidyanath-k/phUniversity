import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../appError/appError";
import catchAsync from "./catchAsync";

const authValidate = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized user!!")
        };

        next();

    });
};
export default authValidate;