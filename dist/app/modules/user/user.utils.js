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
exports.generatedAdminId = exports.generatedFacultyId = exports.generateStudentId = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../appError/appError"));
const user_model_1 = require("./user.model");
// Find Last Student ID
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
// automatic student ID create (semester year, semester code, 4 digit code)
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudentId();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
// created Faculty ID
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentID = (0).toString();
    const lastFacultyID = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    if (lastFacultyID === null || lastFacultyID === void 0 ? void 0 : lastFacultyID.id) {
        return lastFacultyID.id.substring(2);
    }
    else {
        return currentID;
    }
});
const generatedFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let facultyID = yield findLastFacultyId();
    if (!facultyID) {
        throw new appError_1.default(500, 'Not found last faculty ID!');
    }
    if (facultyID) {
        facultyID = facultyID.substring(2);
    }
    let incrementId = (Number(facultyID) + 1).toString().padStart(4, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generatedFacultyId = generatedFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentID = (0).toString();
    const lastAdmin = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : currentID;
});
const generatedAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let adminId = yield findLastAdminId();
    if (!adminId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Last Admin Id is not found!");
    }
    if (adminId) {
        adminId = adminId.substring(2);
    }
    let incrementId = (Number(adminId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generatedAdminId = generatedAdminId;
