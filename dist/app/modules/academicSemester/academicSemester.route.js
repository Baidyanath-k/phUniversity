"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemesterZodValidation_1 = require("./academicSemesterZodValidation");
const router = express_1.default.Router();
// create academic semester
router.post('/create_academic_sem', (0, validateRequest_1.default)(academicSemesterZodValidation_1.AcademicSemesterZodSchema.createAcademicSemZodValidSchema), academicSemester_controller_1.AcademicSemesterController.createAcademicSemCont);
exports.AcademicSemesterRoutes = router;
