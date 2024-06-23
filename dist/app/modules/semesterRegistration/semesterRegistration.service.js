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
exports.semesterRegistrationService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../appError/appError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // validation Academic semester
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Academic semester is not found!!");
    }
    // validation semester registration: semester already exist ot not
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.SemesterRegistration.findOne({ academicSemester });
    if (isSemesterRegistrationExits) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "This semester already exists!!");
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
exports.semesterRegistrationService = {
    createSemesterRegistrationIntoDB
};
