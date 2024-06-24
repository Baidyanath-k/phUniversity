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
exports.offeredCourseController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const OfferedCourse_service_1 = require("./OfferedCourse.service");
const createOfferedCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_service_1.OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Offered course create successfully',
        data: result,
    });
}));
const updateOfferedCourseCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield OfferedCourse_service_1.OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Offered course update successfully',
        data: result,
    });
}));
exports.offeredCourseController = {
    createOfferedCourseCont,
    updateOfferedCourseCont
};
