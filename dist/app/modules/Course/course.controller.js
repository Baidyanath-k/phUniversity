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
exports.courseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const course_service_1 = require("./course.service");
const createCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseServices.createCourseIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Course create successfully',
        data: result,
    });
}));
const findAllCoursesCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseServices.findAllCoursesFormDB(req.query);
    res.status(200).json({
        success: true,
        message: 'All courses find successfully',
        data: result,
    });
}));
const findSingleCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.courseServices.findSingleCourseFormDB(courseId);
    res.status(200).json({
        success: true,
        message: 'Single course find successfully',
        data: result,
    });
}));
const deleteCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.courseServices.deleteCourseFormDB(courseId);
    res.status(200).json({
        success: true,
        message: 'Course delete successfully',
        data: result,
    });
}));
const updateCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.courseServices.updateCourseInDB(courseId, req.body);
    res.status(200).json({
        success: true,
        message: 'Course delete successfully',
        data: result,
    });
}));
exports.courseControllers = {
    createCourseCont,
    findAllCoursesCont,
    findSingleCourseCont,
    deleteCourseCont,
    updateCourseCont,
};
