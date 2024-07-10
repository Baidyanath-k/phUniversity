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
exports.AcademicSemesterController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicSemester_service_1 = require("./academicSemester.service");
const createAcademicSemCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.createAcademicSemesterInDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic semester create successful',
        data: result,
    });
}));
const getAllAcademicSemCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.getAllAcademicSemesterFormDB();
    res.status(200).json({
        success: true,
        message: 'All Academic semester get successful',
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createAcademicSemCont,
    getAllAcademicSemCont
};
