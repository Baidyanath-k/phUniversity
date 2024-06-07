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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicModel = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_const_1 = require("./academicSemester.const");
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_const_1.AcademicSemNameModel,
        required: [true, 'Semester name must be required'],
    },
    code: {
        type: String,
        enum: academicSemester_const_1.AcademicSemCodeModel,
        required: [true, 'Semester code must be required'],
    },
    year: {
        type: String,
        required: [true, 'Semester year must be required'],
    },
    startTMonth: {
        type: String,
        enum: academicSemester_const_1.months,
        required: [true, 'Semester start month must be required'],
    },
    endTMonth: {
        type: String,
        enum: academicSemester_const_1.months,
        required: [true, 'Semester end month must be required'],
    },
}, { timestamps: true });
AcademicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExistsInYear = yield exports.AcademicModel.findOne({
            name: this.name,
            year: this.year,
        });
        if (isSemesterExistsInYear) {
            throw new Error('A document with the same year and semester already exists.');
        }
        next();
    });
});
exports.AcademicModel = (0, mongoose_1.model)('AcademicSemester', AcademicSemesterSchema);
