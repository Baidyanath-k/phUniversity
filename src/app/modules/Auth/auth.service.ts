import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../appError/appError";
import config from "../../config";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {

    // checking if the user is existing
    const user = await User.isUserExistsByCustomID(payload?.id);

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

    const passwordMatched = await User.isPasswordMatched(payload?.password, user.password);
    if (!passwordMatched) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password in-correct! Please provide correct password..")
    };

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: '10d' }
    );

    return {
        accessToken,
        needsPasswordChange: user.needsPasswordChange
    };
};

// password change
const changedPasswordSer = async (userTokenData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {
    const user = await User.isUserExistsByCustomID(userTokenData?.userId);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!!");
    };

    // check this user is deleted
    const userIsDeleted = user?.isDeleted
    if (userIsDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is already deleted!!");
    };

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!!")
    };

    // password matched

    const isPasswordMatched = await User.isPasswordMatched(payload?.oldPassword, user?.password);
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.FORBIDDEN, "This password not matched! Please provide correct password..")
    };

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(payload.newPassword, salt);

    // update password
    await User.findOneAndUpdate({
        id: userTokenData.userId,
        role: userTokenData.role,
    },
        {
            password: newHashPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date(),
        }
    );

    return null;
};


export const authServices = {
    loginUser,
    changedPasswordSer
}