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
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterService = void 0;
const academicSemester_const_1 = require("./academicSemester.const");
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_const_1.academicSemesterCodeAndNameValidate[payload.name] !== payload.code) {
        throw new Error('Semester name and code is invalid');
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    return result;
});
const getAllAcademicSemesterFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.find();
    return result;
});
exports.academicSemesterService = {
    createAcademicSemesterInDB,
    getAllAcademicSemesterFormDB
};
