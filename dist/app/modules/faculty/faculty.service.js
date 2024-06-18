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
exports.facultyServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const faculty_model_1 = require("./faculty.model");
const getAllFacultyIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.find();
    return result;
});
const getSingleFacultyInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOne({ id })
        .populate('academicDepartment')
        .populate('user');
    return result;
});
const getSearchFacultyInDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ['email', 'name.firstName', 'presentAddress'];
    const facultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find(), query)
        .search(searchTerm)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facultyQuery.modelQuery;
    return result;
});
exports.facultyServices = {
    getAllFacultyIntoDB,
    getSingleFacultyInDB,
    getSearchFacultyInDB
};
