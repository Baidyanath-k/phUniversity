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
exports.semesterRegistrationController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const semesterRegistration_service_1 = require("./semesterRegistration.service");
const createSemesterRegistrationCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationService.createSemesterRegistrationIntoDB(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Semester registration create successfully',
        data: result,
    });
}));
const getAllSemesterRegistrationCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationService.getAllSemesterRegistrationFormDB(req.query);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'All Semester registration get successfully',
        data: result,
    });
}));
const getSingleSemesterRegistrationCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistrationID } = req.params;
    const result = yield semesterRegistration_service_1.semesterRegistrationService.getSingleSemesterRegistrationFormDB(semesterRegistrationID);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Single Semester registration get successfully',
        data: result,
    });
}));
const updateSemesterRegistrationCont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistrationID } = req.params;
    const result = yield semesterRegistration_service_1.semesterRegistrationService.updateSemesterRegistrationInDB(semesterRegistrationID, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Update Semester registration successfully',
        data: result,
    });
}));
exports.semesterRegistrationController = {
    createSemesterRegistrationCont,
    getAllSemesterRegistrationCont,
    getSingleSemesterRegistrationCont,
    updateSemesterRegistrationCont
};
