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
);


AcademicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartment.findOne(
        {
            name: this.name
        }
    );
    if (isDepartmentExists) {
        throw new Error("This department is already exists!")
    }
    next()
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentIdExists = await AcademicDepartment.findOne(query);

    if (isDepartmentIdExists) {
        throw new Error("This department ID does not exists!")
    }

    next()
})


export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", AcademicDepartmentSchema)