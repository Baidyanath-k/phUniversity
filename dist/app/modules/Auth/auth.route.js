"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authValidation_1 = __importDefault(require("../../utils/authValidation"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const user_const_1 = require("../user/user.const");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// login router
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.loginUserCont);
// password changed
router.post('/changed-password', (0, authValidation_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_validation_1.authValidation.changedPasswordValidationSchema), auth_controller_1.authController.changedPasswordCont);
// refresh Token router
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidationSchema), auth_controller_1.authController.refreshTokenCont);
exports.AuthRoutes = router;
