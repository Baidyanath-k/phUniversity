"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminZodValidation = void 0;
const zod_1 = require("zod");
const admin_const_1 = require("./admin.const");
const createAdminNameValidateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    middleName: zod_1.z.string().max(20),
    lastName: zod_1.z.string().max(20),
});
const createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        admin: zod_1.z.object({
            designation: zod_1.z.string(),
            name: createAdminNameValidateSchema,
            gender: zod_1.z.enum([...admin_const_1.AdminGender]),
            bloodGroup: zod_1.z
                .enum([...admin_const_1.AdminBloodGroup])
                .optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
const updateAdminNameValidateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    middleName: zod_1.z.string().max(20).optional(),
    lastName: zod_1.z.string().max(20).optional(),
});
const updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        admin: zod_1.z.object({
            designation: zod_1.z.string().optional(),
            name: updateAdminNameValidateSchema.optional(),
            gender: zod_1.z.enum([...admin_const_1.AdminGender]).optional(),
            bloodGroup: zod_1.z
                .enum([...admin_const_1.AdminBloodGroup])
                .optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.adminZodValidation = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};
