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
exports.academicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const createAcademicFacultyCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyService.createAcademicFacultyInDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic faculty create successfully',
        data: result,
    });
}));
const getAllAcademicFacultiesCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyService.getAllAcademicFacultiesInDB();
    res.status(200).json({
        success: true,
        message: 'Get all academic faculty successfully',
        data: result,
    });
}));
const getSingleAcademicFacultyCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicFacultyId } = req.params;
    const result = yield academicFaculty_service_1.academicFacultyService.getSingleAcademicFacultyByID(academicFacultyId);
    res.status(200).json({
        success: true,
        message: 'Get single academic faculty successfully',
        data: result,
    });
}));
const updateAcademicFacultyCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicFacultyId } = req.params;
    const result = yield academicFaculty_service_1.academicFacultyService.updateAcademicFacultyInDB(academicFacultyId, req.body);
    res.status(200).json({
        success: true,
        message: 'Update academic faculty successfully',
        data: result,
    });
}));
exports.academicFacultyController = {
    createAcademicFacultyCont,
    getAllAcademicFacultiesCont,
    getSingleAcademicFacultyCont,
    updateAcademicFacultyCont,
};
