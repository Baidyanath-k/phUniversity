"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../appError/appError"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is existing
    const user = yield user_model_1.User.isUserExistsByCustomID(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "This user is not found!!");
    }
    ;
    // checking if the user is deleted
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is already deleted!!");
    }
    ;
    // checking if the user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is blocked!!");
    }
    ;
    const passwordMatched = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user.password);
    if (!passwordMatched) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Password in-correct! Please provide correct password..");
    }
    ;
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user.needsPasswordChange
    };
});
// password change
const changedPasswordSer = (userTokenData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomID(userTokenData === null || userTokenData === void 0 ? void 0 : userTokenData.userId);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "This user is not found!!");
    }
    ;
    // check this user is deleted
    const userIsDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (userIsDeleted) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is already deleted!!");
    }
    ;
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is blocked!!");
    }
    ;
    // password matched
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This password not matched! Please provide correct password..");
    }
    ;
    // hash new password
    const salt = yield bcrypt_1.default.genSalt(10);
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, salt);
    // update password
    yield user_model_1.User.findOneAndUpdate({
        id: userTokenData.userId,
        role: userTokenData.role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    return null;
});
// refresh token service: 
// user validation
// new accessToken create use refresh token
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    // if the token is sent form client 
    if (!refreshToken) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized user!!");
    }
    ;
    // check if the token is valid
    const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = yield user_model_1.User.isUserExistsByCustomID(userId);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "This user is not found!!");
    }
    ;
    // checking if the user is deleted
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is already deleted!!");
    }
    ;
    // checking if the user status
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is blocked!!");
    }
    ;
    // jwt time and password update time check
    if (user.passwordChangeAt && user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are provide token after password change!!");
    }
    ;
    // create access token use refresh token
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    return {
        accessToken
    };
});
exports.authServices = {
    loginUser,
    changedPasswordSer,
    refreshToken
};
