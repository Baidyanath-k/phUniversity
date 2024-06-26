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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../appError/appError"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is existing
    const user = yield user_model_1.User.isUserExistsByCustomID(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "This user is not found!!");
    }
    ;
    // // checking if the user is deleted
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is already deleted!!");
    }
    ;
    // checking if the user is already
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
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: '10d' });
    return {
        accessToken,
        needsPasswordChange: user.needsPasswordChange
    };
});
exports.authServices = {
    loginUser
};
