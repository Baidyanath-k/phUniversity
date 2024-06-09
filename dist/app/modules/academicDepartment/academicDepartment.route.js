"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.CreateAcademicDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartmentCont);
router.get('/get-all-academic-departments', academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartmentCont);
router.get('/get-single-academic-department/:departmentId', academicDepartment_controller_1.academicDepartmentController.getSingleAcademicDepartmentCont);
router.patch('/update-academic-department/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.UpdateAcademicDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.updateAcademicDepartmentCont);
exports.academicDepartRoutes = router;
