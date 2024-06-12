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
exports.StudentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const student_service_1 = require("./student.service");
const getAllStudentsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getAllStudentDB();
    res.status(200).json({
        success: true,
        message: 'Student is get successfully',
        data: result,
    });
}));
const getSingleStudentByIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: 'Single Student is get successfully',
        data: result,
    });
}));
const deleteStudentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: 'Student delete successfully',
        data: result,
    });
}));
// update student controller
const updateStudentCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const { student } = req.body;
    const result = yield student_service_1.StudentServices.updateStudentInDB(studentId, student);
    res.status(200).json({
        success: true,
        message: 'Student update successfully',
        data: result,
    });
}));
exports.StudentControllers = {
    getAllStudentsController,
    getSingleStudentByIdController,
    deleteStudentCont,
    updateStudentCont
};
