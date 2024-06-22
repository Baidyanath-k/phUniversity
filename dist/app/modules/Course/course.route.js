"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post('/create-course', (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseValidationSchema), course_controller_1.courseControllers.createCourseCont);
router.get('/find-all-course', course_controller_1.courseControllers.findAllCoursesCont);
router.get('/find-single-course/:courseId', course_controller_1.courseControllers.findSingleCourseCont);
router.delete('/delete-course/:courseId', course_controller_1.courseControllers.deleteCourseCont);
router.patch('/course-update/:courseId', (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseValidationSchema), course_controller_1.courseControllers.updateCourseCont);
router.put('/faculties/:courseId/assign-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidation.facultiesWithCourseValidationSchema), course_controller_1.courseControllers.assignFacultiesWithCourseCont);
router.delete('/faculties/:courseId/delete-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidation.facultiesWithCourseValidationSchema), course_controller_1.courseControllers.removeFacultiesWithCourseCont);
exports.courseRoutes = router;
