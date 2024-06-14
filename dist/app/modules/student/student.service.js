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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../appError/appError"));
const user_model_1 = require("../user/user.model");
const student_model_1 = require("./student.model");
// Find ALL Students form MongoDB
const getAllStudentDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.find().populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'refAcademicFaculty',
        },
    });
    ;
    return result;
});
// search student form MongoDB
const searchStudentDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // {email: {$regex: query.searchTerm, $option:i}}
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const result = yield student_model_1.StudentModel.find({
        $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    });
    return result;
});
// Find One Student By (custom made ID) ID form MongoDB
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.findOne({ id: id });
    return result;
});
// Delete Student By (custom made ID) ID form MongoDB
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.StudentModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new appError_1.default(400, "Failed to deleted student");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(400, "Failed to deleted student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new appError_1.default(400, "Failed to deleted student and error");
    }
});
// Update Student By (custom made ID) ID form MongoDB
const updateStudentInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    /*
      guarding:{
        fatherOccupation:"teacher"
      }
  
      guarding.fatherOccupation = teacher
    */
    const modifyStudentData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifyStudentData[`name.${key}`] = value;
        }
    }
    ;
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifyStudentData[`guardian.${key}`] = value;
        }
    }
    ;
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifyStudentData[`localGuardian.${key}`] = value;
        }
    }
    ;
    const result = yield student_model_1.StudentModel.findOneAndUpdate({ id }, modifyStudentData, { new: true, runValidators: true });
    return result;
});
exports.StudentServices = {
    getAllStudentDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInDB,
    searchStudentDB
};
