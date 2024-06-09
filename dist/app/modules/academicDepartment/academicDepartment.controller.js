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
exports.academicDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartmentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.academicDepartmentService.createAcademicDepartmentInDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic department create successfully',
        data: result,
    });
}));
const getAllAcademicDepartmentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.academicDepartmentService.getAllAcademicDepartmentInDB();
    res.status(200).json({
        success: true,
        message: 'Find all academic departments successfully',
        data: result,
    });
}));
const getSingleAcademicDepartmentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const result = yield academicDepartment_service_1.academicDepartmentService.getSingleAcademicDepartmentByIdInDB(departmentId);
    res.status(200).json({
        success: true,
        message: 'Find single academic department successfully',
        data: result,
    });
}));
const updateAcademicDepartmentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const result = yield academicDepartment_service_1.academicDepartmentService.updateAcademicDepartmentByIdInDB(departmentId, req.body);
    res.status(200).json({
        success: true,
        message: 'Academic department update successfully',
        data: result,
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartmentCont,
    getAllAcademicDepartmentCont,
    getSingleAcademicDepartmentCont,
    updateAcademicDepartmentCont
};
