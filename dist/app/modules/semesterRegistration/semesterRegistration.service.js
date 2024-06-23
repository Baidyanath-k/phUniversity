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
exports.semesterRegistrationService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../appError/appError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_const_1 = require("./semesterRegistration.const");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check: already "UPCOMING"/"ONGOING" register semester
    const isUpcomingOrOngoing = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semesterRegistration_const_1.RegistrationStatus.UPCOMING },
            { status: semesterRegistration_const_1.RegistrationStatus.ONGOING },
        ]
    });
    if ((isUpcomingOrOngoing === null || isUpcomingOrOngoing === void 0 ? void 0 : isUpcomingOrOngoing.status) === 'UPCOMING' || (isUpcomingOrOngoing === null || isUpcomingOrOngoing === void 0 ? void 0 : isUpcomingOrOngoing.status) === "ONGOING") {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `There is already an ${isUpcomingOrOngoing === null || isUpcomingOrOngoing === void 0 ? void 0 : isUpcomingOrOngoing.status} register semester!`);
    }
    ;
    // validation Academic semester
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Academic semester is not found!!");
    }
    ;
    // validation semester registration: semester already exist ot not
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.SemesterRegistration.findOne({ academicSemester });
    if (isSemesterRegistrationExits) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "This semester already exists!!");
    }
    ;
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrationFormDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
const getSingleSemesterRegistrationFormDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return result;
});
const updateSemesterRegistrationInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check semester register
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExits) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `This semester registration not found!!`);
    }
    ;
    // if semester registration data status:ended then data do not update
    const currentSemesterStatus = isSemesterRegistrationExits === null || isSemesterRegistrationExits === void 0 ? void 0 : isSemesterRegistrationExits.status;
    if (currentSemesterStatus === "ENDED") {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    }
    ;
    // UPCOMING --> ONGOING --> ENDED
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (currentSemesterStatus === semesterRegistration_const_1.RegistrationStatus.UPCOMING && requestedStatus === semesterRegistration_const_1.RegistrationStatus.ENDED) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    ;
    if (currentSemesterStatus === semesterRegistration_const_1.RegistrationStatus.ONGOING && requestedStatus === semesterRegistration_const_1.RegistrationStatus.UPCOMING) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    ;
    // finally send update data
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFormDB,
    getSingleSemesterRegistrationFormDB,
    updateSemesterRegistrationInDB
};
