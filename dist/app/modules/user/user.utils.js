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
const appError_1 = __importDefault(require("../../appError/appError"));
const user_model_1 = require("./user.model");
// Find Last Student ID
const lastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
// automatic student ID create (semester year, semester code, 4 digit code)
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentID = (0).toString();
    // 2030 01 0000
    const lastStudentIds = yield lastStudentId();
    const lastSemesterYear = lastStudentIds === null || lastStudentIds === void 0 ? void 0 : lastStudentIds.substring(0, 4);
    const lastSemesterCode = lastStudentIds === null || lastStudentIds === void 0 ? void 0 : lastStudentIds.substring(4, 6);
    const currentSemesterYear = payload.year;
    const currentSemesterCode = payload.code;
    if (lastStudentIds &&
        lastSemesterCode === currentSemesterCode &&
        lastSemesterYear === currentSemesterYear) {
        currentID = lastStudentIds.substring(6);
    }
    let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementID = `${payload.year}${payload.code}${incrementID}`;
    return incrementID;
});
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyID = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    if (lastFacultyID === null || lastFacultyID === void 0 ? void 0 : lastFacultyID.id) {
        return lastFacultyID.id.substring(2);
    }
    else {
        return undefined;
    }
});
const generatedFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentID = (0).toString();
    const lastFacultyID = yield findLastFacultyId();
    if (!lastFacultyID) {
        throw new appError_1.default(500, 'Not found last faculty ID!');
    }
    if (lastFacultyID) {
        currentID = lastFacultyID.substring(2);
    }
    let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generatedFacultyId = generatedFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdminId = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    if (lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.id) {
        return lastAdminId.id.substring(2);
    }
    else {
        return undefined;
    }
});
const generatedAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentID = (0).toString();
    const lastAdminId = yield findLastAdminId();
    if (!lastAdminId) {
        throw new appError_1.default(500, 'Not found last Admin ID!');
    }
    if (lastAdminId) {
        currentID = lastAdminId.substring(2);
    }
    let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generatedAdminId = generatedAdminId;
