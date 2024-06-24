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
exports.OfferedCourseServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../appError/appError"));
const course_model_1 = require("../Course/course.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const faculty_model_1 = require("../faculty/faculty.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const OfferedCourse_model_1 = require("./OfferedCourse.model");
const OfferedCourse_utils_1 = require("./OfferedCourse.utils");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;
    // check semesterRegistration
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Semester registration is not found!");
    }
    ;
    // find academicSemester;
    const isAcademicSemesterExists = isSemesterRegistrationExists.academicSemester;
    // check academicFaculty
    const isAcademicFacultyExists = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Academic Faculty is not found!");
    }
    ;
    // check academicDepartment
    const isAcademicDepartmentExists = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Academic Department is not found!");
    }
    ;
    // check course
    const isCourseExists = yield course_model_1.Course.findById(course);
    if (!isCourseExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Course is not found!");
    }
    ;
    // check faculty
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Faculty is not found!");
    }
    ;
    // check if the department is belong to the  faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        refAcademicFaculty: academicFaculty,
        academicDepartment: academicDepartment
    });
    if (!isDepartmentBelongToFaculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `This ${isAcademicDepartmentExists.name} is not  belong to this ${isAcademicFacultyExists.name}`);
    }
    ;
    // check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = yield OfferedCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Offered course with same section is already exist!`);
    }
    ;
    // check faculty schedule
    const assignedSchedule = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime
    };
    if ((0, OfferedCourse_utils_1.hasTimeConflict)(assignedSchedule, newSchedule)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "This faculty is not available that time ! Choose other time or day........");
    }
    // set Academic Semester
    payload.academicSemester = isAcademicSemesterExists;
    // create Offered course
    const result = yield OfferedCourse_model_1.OfferedCourse.create(payload);
    return result;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    // check offered course is exists
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Offered Course is not found!");
    }
    ;
    // check faculty is exists
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Faculty is not found!");
    }
    ;
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Offered course can not update ! because the semester ${semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status}`);
    }
    // schedule check
    const assignedSchedule = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime
    };
    if ((0, OfferedCourse_utils_1.hasTimeConflict)(assignedSchedule, newSchedule)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "This faculty is not available that time ! Choose other time or day........");
    }
    ;
    const result = yield OfferedCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    updateOfferedCourseIntoDB
};
