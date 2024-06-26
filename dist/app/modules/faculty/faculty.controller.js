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
exports.facultiesController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const faculty_service_1 = require("./faculty.service");
const getAllFacultiesCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("text", req.user);
    const result = yield faculty_service_1.facultyServices.getAllFacultyIntoDB();
    res.status(200).json({
        success: true,
        message: 'All faculty get successfully',
        data: result,
    });
}));
const singleFacultyCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_service_1.facultyServices.getSingleFacultyInDB(id);
    res.status(200).json({
        success: true,
        message: 'Single faculty get successfully',
        data: result,
    });
}));
const searchFacultyCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.facultyServices.getSearchFacultyInDB(req.query);
    res.status(200).json({
        success: true,
        message: 'Single faculty get successfully',
        data: result,
    });
}));
exports.facultiesController = {
    getAllFacultiesCont,
    singleFacultyCont,
    searchFacultyCont,
};
