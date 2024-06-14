"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const student_controller_1 = require("./student.controller");
const student_validate_1 = require("./student.validate");
const router = express_1.default.Router();
router.get('/get_all_students', student_controller_1.StudentControllers.getAllStudentsController);
router.get('/search_students', student_controller_1.StudentControllers.searchStudentsController);
router.get('/find_student/:studentId', student_controller_1.StudentControllers.getSingleStudentByIdController);
router.delete('/delete-student/:studentId', student_controller_1.StudentControllers.deleteStudentCont);
router.patch('/update-student/:studentId', (0, validateRequest_1.default)(student_validate_1.stu_Zod_Valid_Schema.updateStudentValidation), student_controller_1.StudentControllers.updateStudentCont);
exports.StudentRoutes = router;
