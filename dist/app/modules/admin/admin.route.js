"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const authValidation_1 = __importDefault(require("../../utils/authValidation"));
const user_const_1 = require("../user/user.const");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/get-all-admin', (0, authValidation_1.default)(user_const_1.USER_ROLE.admin), admin_controller_1.adminController.getAllAdminCont);
exports.adminRouter = router;
