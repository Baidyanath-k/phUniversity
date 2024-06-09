"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidation = void 0;
const zod_1 = require("zod");
const CreateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic department name must be string',
            required_error: 'Academic department name must be required',
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Academic Faculty must be required',
        }),
    }),
});
const UpdateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Academic department name must be string',
            required_error: 'Academic department name must be required',
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Academic Faculty must be required',
        })
            .optional(),
    }),
});
exports.academicDepartmentValidation = {
    CreateAcademicDepartmentValidation,
    UpdateAcademicDepartmentValidation,
};
