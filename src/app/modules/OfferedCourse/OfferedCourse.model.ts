import { Schema, model } from "mongoose";
import { Days } from "./OfferedCourse.const";
import { TOfferedCourse } from "./OfferedCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'SemesterRegistration'
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicSemester'
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'academicFaculty'
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicDepartment'
        },
        course: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        faculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Faculty'
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        section: {
            type: Number,
            required: true,
        },
        days: {
            type: String,
            enum: {
                values: Days,
                message: `{VALUE} is not a valid status`
            }
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true
    }
);


export const OfferedCourse = model<TOfferedCourse>('OfferedCourse', offeredCourseSchema);