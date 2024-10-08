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
exports.academicSemesterService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicSemester_const_1 = require("./academicSemester.const");
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_const_1.academicSemesterCodeAndNameValidate[payload.name] !== payload.code) {
        throw new Error('Semester name and code is invalid');
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    return result;
});
const getAllAcademicSemesterFormDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterQuery = new QueryBuilder_1.default(academicSemester_model_1.AcademicSemester.find(), query)
        .search(academicSemester_const_1.AcademicSemesterSearchableFields).filter().sort().paginate().fields();
    const result = yield academicSemesterQuery.modelQuery;
    const meta = yield academicSemesterQuery.countTotal();
    return {
        result,
        meta
    };
});
exports.academicSemesterService = {
    createAcademicSemesterInDB,
    getAllAcademicSemesterFormDB
};
