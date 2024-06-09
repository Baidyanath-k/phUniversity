import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: [true, "Academic Department name must be required"],
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: [true, "Academic Faculty must be required"],
        unique: true,
        ref: "AcademicFaculty"
    }
},
    { timestamps: true }
)

export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", AcademicDepartmentSchema)