"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authValidation_1 = __importDefault(require("../../utils/authValidation"));
const sendImageToClouderyMulter_1 = require("../../utils/sendImageToClouderyMulter");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const admin_validation_1 = require("../admin/admin.validation");
const faculty_validate_1 = require("../faculty/faculty.validate");
const student_validate_1 = require("../student/student.validate");
const user_const_1 = require("./user.const");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// create student router
router.post('/create_student', (0, authValidation_1.default)(user_const_1.USER_ROLE.admin), sendImageToClouderyMulter_1.upload.single('file'), (req, res, next) => {
    var _a;
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
        req.body = JSON.parse(req.body.data);
    }
    next();
}, (0, validateRequest_1.default)(student_validate_1.stu_Zod_Valid_Schema.createStudentValidation), user_controller_1.userControllers.createStudent);
// create faculty router
router.post('/create_faculty', (0, authValidation_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty), (0, validateRequest_1.default)(faculty_validate_1.FacultyZodValidations.createFacultyValidateSchema), user_controller_1.userControllers.createFaculty);
// create admin router
router.post('/create_admin', (0, authValidation_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(admin_validation_1.adminZodValidation.createAdminValidationSchema), user_controller_1.userControllers.createAdminCont);
exports.createUserRoutes = router;
