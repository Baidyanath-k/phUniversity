"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_const_1 = require("./semesterRegistration.const");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Academic Semester must be required"],
        unique: true,
        ref: 'AcademicSemester'
    },
    status: {
        type: String,
        enum: {
            values: semesterRegistration_const_1.SemesterRegistrationStatus,
            message: `{VALUE} is not a valid status`
        },
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: [true, "Semester Start Date must be required!"]
    },
    endDate: {
        type: Date,
        required: [true, "Semester end Date must be required!"]
    },
    minCredit: {
        type: Number,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 16
    }
}, {
    timestamps: true,
});
exports.SemesterRegistration = (0, mongoose_1.model)('SemesterRegistration', semesterRegistrationSchema);
