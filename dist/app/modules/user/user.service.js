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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = (password, userStudentData) => __awaiter(void 0, void 0, void 0, function* () {
    // create user->student
    const userData = {};
    // If password not given then set default password
    if (!password) {
        password = config_1.default.default_pass;
    }
    else {
        userData.password = password;
    }
    // set role = student
    userData.role = 'student';
    // find ID by academic semester
    const admissionSemester = yield academicSemester_model_1.AcademicModel.findById(userStudentData.admissionSemester);
    // set student ID
    userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
    const newUser = yield user_model_1.User.create(userData);
    if (Object.keys(newUser).length) {
        userStudentData.id = newUser.id;
        userStudentData.user = newUser._id;
        const newStudent = yield student_model_1.StudentModel.create(userStudentData);
        return newStudent;
    }
});
exports.userService = {
    createStudentIntoDB,
};
