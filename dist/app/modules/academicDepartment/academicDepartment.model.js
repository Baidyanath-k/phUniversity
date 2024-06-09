"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const AcademicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Academic Department name must be required"],
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Academic Faculty must be required"],
        unique: true,
        ref: "AcademicFaculty"
    }
}, { timestamps: true });
exports.AcademicDepartment = (0, mongoose_1.model)("AcademicDepartment", AcademicDepartmentSchema);
