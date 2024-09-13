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
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../appError/appError"));
const config_1 = __importDefault(require("../../config"));
const sendImageToClouderyMulter_1 = require("../../utils/sendImageToClouderyMulter");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const admin_model_1 = require("../admin/admin.model");
const faculty_model_1 = require("../faculty/faculty.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = (file, password, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    // set student email
    userData.email = payLoad.email;
    // find ID by academic semester
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(payLoad.admissionSemester);
    if (!admissionSemester) {
        throw new appError_1.default(400, 'Admission semester not found');
    }
    // find department
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payLoad.academicDepartment);
    if (!academicDepartment) {
        throw new appError_1.default(400, 'Aademic department not found');
    }
    payLoad.academicFaculty = academicDepartment.refAcademicFaculty;
    // transaction rollback start
    const session = yield mongoose_1.default.startSession(); // create a session
    try {
        session.startTransaction(); // start session
        // set student ID
        if (!admissionSemester) {
            throw new appError_1.default(400, 'Not found admissionSemester!');
        }
        else {
            userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        }
        // userData.id = await generateStudentId(admissionSemester);
        if (file) {
            const imageName = `${userData.id}${(_a = payLoad === null || payLoad === void 0 ? void 0 : payLoad.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
            const path = file === null || file === void 0 ? void 0 : file.path;
            // send Image Cloudinary
            const { secure_url } = yield (0, sendImageToClouderyMulter_1.sendImageToCloudinary)(imageName, path);
            payLoad.profileImg = secure_url;
        }
        // create a user(transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // session e data array hisebe dite hobe
        if (!newUser.length) {
            throw new appError_1.default(400, 'Failed to create user');
        }
        payLoad.id = newUser[0].id;
        payLoad.user = newUser[0]._id;
        // create a student(transaction-2)
        const newStudent = yield student_model_1.StudentModel.create([payLoad], { session });
        if (!newStudent) {
            throw new appError_1.default(400, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
// create faculty
const createFacultyInDB = (password, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_pass;
    userData.role = 'faculty';
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payLoad.academicDepartment);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction(); // start session
        // set student ID
        if (!academicDepartment) {
            throw new appError_1.default(400, 'Not found academic department!');
        }
        const userDataId = yield (0, user_utils_1.generatedFacultyId)();
        if (!userDataId) {
            throw new appError_1.default(400, 'Not found userData Id!');
        }
        userData.id = userDataId;
        // create a user(transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new appError_1.default(400, 'Failed to create user');
        }
        payLoad.id = newUser[0].id;
        payLoad.user = newUser[0]._id;
        // create a student(transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payLoad], { session });
        if (!newFaculty) {
            throw new appError_1.default(400, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const createAdminIntoDB = (password, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    if (!password) {
        password = config_1.default.default_pass;
    }
    else {
        userData.password = password;
    }
    userData.role = 'admin';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userDataId = yield (0, user_utils_1.generatedAdminId)();
        if (!userDataId) {
            throw new appError_1.default(400, 'Not found userData Id!');
        }
        userData.id = userDataId;
        const createUser = yield user_model_1.User.create([userData], { session });
        if (!createUser.length) {
            throw new appError_1.default(400, "Admin 'User' not created!!");
        }
        payLoad.id = createUser[0].id;
        payLoad.user = createUser[0]._id;
        const createAdmin = yield admin_model_1.Admin.create([payLoad], { session });
        if (!createAdmin.length) {
            throw new appError_1.default(400, 'Admin not created!!');
        }
        session.commitTransaction();
        session.endSession();
        return createAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.userService = {
    createStudentIntoDB,
    createFacultyInDB,
    createAdminIntoDB,
};
