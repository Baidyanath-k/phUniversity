"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Course title is required!!"],
        trim: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: [true, "Prefix is required!!"],
        trim: true,
    },
    code: {
        type: Number,
        trim: true,
        required: [true, "Code is required!!"],
    },
    credits: {
        type: Number,
        trim: true,
        required: [true, "Credits are required!!"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema]
}, {
    timestamps: true
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
