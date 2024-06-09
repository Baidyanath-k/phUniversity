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
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const appError_1 = __importDefault(require("../../appError/appError"));
const AcademicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Academic Department name must be required'],
        unique: true,
    },
    refAcademicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Academic Faculty must be required'],
        unique: true,
        ref: 'academicFaculty',
    },
}, { timestamps: true });
// pre hook save data
AcademicDepartmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDepartmentExists = yield exports.AcademicDepartment.findOne({
            name: this.name,
        });
        if (isDepartmentExists) {
            throw new appError_1.default(404, 'This department is already exists!');
        }
        next();
    });
});
// pre hook update data
AcademicDepartmentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentIdExists = yield exports.AcademicDepartment.findOne(query);
        if (!isDepartmentIdExists) {
            throw new appError_1.default(404, 'This department ID does not exists!');
        }
        next();
    });
});
// mongoose model
exports.AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', AcademicDepartmentSchema);
