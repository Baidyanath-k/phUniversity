"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const semesterRegistraition_validation_1 = require("./semesterRegistraition.validation");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const router = express_1.default.Router();
router.post('/create-semester-register', (0, validateRequest_1.default)(semesterRegistraition_validation_1.semesterRegistrationValidate.createSemesterRegistrationValidateSchema), semesterRegistration_controller_1.semesterRegistrationController.createSemesterRegistrationCont);
router.get('/get-all-semester-register', semesterRegistration_controller_1.semesterRegistrationController.getAllSemesterRegistrationCont);
router.get('/get-single-semester/:semesterRegistrationID', semesterRegistration_controller_1.semesterRegistrationController.getSingleSemesterRegistrationCont);
router.patch('/update-semester-registration/:semesterRegistrationID', (0, validateRequest_1.default)(semesterRegistraition_validation_1.semesterRegistrationValidate.updateSemesterRegistrationValidateSchema), semesterRegistration_controller_1.semesterRegistrationController.updateSemesterRegistrationCont);
exports.semesterRegistrationRoutes = router;
