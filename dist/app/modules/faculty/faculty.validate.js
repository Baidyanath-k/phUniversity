"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyZodValidations = void 0;
const zod_1 = require("zod");
const faculty_const_1 = require("./faculty.const");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(1, 'User First Name must be required')
        .max(20, 'First name can not be more than 20 characters')
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z
        .string()
        .trim()
        .max(20, 'Middle name can not be more than 20 characters')
        .optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .min(1, 'User Last Name must be required')
        .max(20, 'Last name can not be more than 20 characters'),
});
const createFacultyValidateSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        faculty: zod_1.z.object({
            designation: zod_1.z.string().min(1, 'Faculty Designation is required!!'),
            name: createUserNameValidationSchema,
            gender: zod_1.z.enum([...faculty_const_1.Gender]),
            bloodGroup: zod_1.z.enum([...faculty_const_1.BloodGroup]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email('{VALUE} is not valid email')
                .min(1, 'Email must be required!!'),
            contactNo: zod_1.z.string().min(1, 'Contact No. Must be required!!'),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, 'Emergency Contact No. Must be required!!'),
            presentAddress: zod_1.z.string().min(1, 'Present Address required!!'),
            permanentAddress: zod_1.z.string().min(1, 'Permanent Address required!!'),
            profileImg: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().optional().default(false),
            academicDepartment: zod_1.z
                .string()
                .min(1, 'Academic Department ID is required'),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(1, 'User First Name must be required')
        .max(20, 'First name can not be more than 20 characters')
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    })
        .optional(),
    middleName: zod_1.z
        .string()
        .trim()
        .max(20, 'Middle name can not be more than 20 characters')
        .optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .min(1, 'User Last Name must be required')
        .max(20, 'Last name can not be more than 20 characters')
        .optional(),
});
const updateFacultyValidateSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            designation: zod_1.z
                .string()
                .min(1, 'Faculty Designation is required!!')
                .optional(),
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum([...faculty_const_1.Gender]).optional(),
            bloodGroup: zod_1.z.enum([...faculty_const_1.BloodGroup]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email('{VALUE} is not valid email')
                .min(1, 'Email must be required!!')
                .optional(),
            contactNo: zod_1.z.string().min(1, 'Contact No. Must be required!!').optional(),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, 'Emergency Contact No. Must be required!!')
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, 'Present Address required!!')
                .optional(),
            permanentAddress: zod_1.z
                .string()
                .min(1, 'Permanent Address required!!')
                .optional(),
            profileImg: zod_1.z.string().optional(),
            isDeleted: zod_1.z.boolean().optional().default(false).optional(),
            academicDepartment: zod_1.z
                .string()
                .min(1, 'Academic Department ID is required')
                .optional(),
        }),
    }),
});
exports.FacultyZodValidations = {
    createFacultyValidateSchema,
    updateFacultyValidateSchema,
};
