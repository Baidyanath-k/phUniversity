"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
const AcademicFacultySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Academic Faculty name must be required!"],
        unique: true,
    }
}, { timestamps: true });
exports.AcademicFaculty = (0, mongoose_1.model)("academicFaculty", AcademicFacultySchema);
