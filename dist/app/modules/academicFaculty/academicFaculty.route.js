"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.CreateAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.createAcademicFacultyCont);
router.get('/get-all-academic-faculties', academicFaculty_controller_1.academicFacultyController.getAllAcademicFacultiesCont);
router.get('/get-single-academic-faculty/:academicFacultyId', academicFaculty_controller_1.academicFacultyController.getSingleAcademicFacultyCont);
router.patch('/update-academic-faculty/:academicFacultyId', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.UpdateAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.updateAcademicFacultyCont);
exports.AcademicFacultyRoutes = router;
