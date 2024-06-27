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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../appError/appError"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("./catchAsync"));
const authValidate = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // if the token is sent form client 
        if (!token) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized user!!");
        }
        ;
        // check if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { userId, role, iat } = decoded;
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
        // user role check
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not same token!!");
        }
        ;
        req.user = decoded;
        next();
    }));
};
exports.default = authValidate;
