"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidation = void 0;
const zod_1 = require("zod");
const CreateAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Faculty name must be string!"
        })
    })
});
const UpdateAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Faculty name must be string!"
        })
    })
});
exports.academicFacultyValidation = {
    CreateAcademicFacultyValidationSchema,
    UpdateAcademicFacultyValidationSchema
};
