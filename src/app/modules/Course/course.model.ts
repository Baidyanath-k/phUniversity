import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const courseSchema = new Schema<TCourse>(
    {
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
    },
    {
        timestamps: true
    }
);

export const Course = model<TCourse>('Course', courseSchema);