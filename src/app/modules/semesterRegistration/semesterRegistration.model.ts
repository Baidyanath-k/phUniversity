import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistraion.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.const";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: [true, "Academic Semester must be required"],
            unique: true,
            ref: 'AcademicSemester'
        },
        status: {
            type: String,
            enum: {
                values: SemesterRegistrationStatus,
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
    },
    {
        timestamps: true,
    }
);

export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);