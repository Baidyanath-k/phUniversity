"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stu_Zod_Valid_Schema = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = require("zod");
// mongoose ID validation
// const objectIdValidation = (id: string) => {
//   return mongoose.Types.ObjectId.isValid(id);
// };
// create Define the name schema
const studentNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .refine((value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
    }, { message: '{VALUE} is not capitalize formate' }),
    secondName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name is required' })
        .refine((value) => validator_1.default.isAlpha(value), {
        message: '{VALUE} is number. Do not use number',
    }),
});
// Define the guardian schema
const studentGuardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, { message: "Father's name is required" }),
    fatherOccupation: zod_1.z
        .string()
        .min(1, { message: "Father's occupation is required" }),
    fatherContactNo: zod_1.z
        .string()
        .min(1, { message: "Father's contact number is required" }),
    motherName: zod_1.z.string().min(1, { message: "Mother's name is required" }),
    motherOccupation: zod_1.z
        .string()
        .min(1, { message: "Mother's occupation is required" }),
    motherContactNo: zod_1.z
        .string()
        .min(1, { message: "Mother's contact number is required" }),
});
// Define the local guardian schema
const studentLocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Local guardian's name is required" }),
    occupation: zod_1.z
        .string()
        .min(1, { message: "Local guardian's occupation is required" }),
    contactNo: zod_1.z
        .string()
        .min(1, { message: "Local guardian's contact number is required" }),
    address: zod_1.z
        .string()
        .min(1, { message: "Local guardian's address is required" }),
});
// Define the main student schema
const createStudentValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string()
            .max(20, { message: 'Password cannot exceed 20 characters' })
            .min(1, { message: 'Password is required' }),
        student: zod_1.z.object({
            name: studentNameSchema,
            gender: zod_1.z.enum(['male', 'female', 'others'], {
                message: '{VALUE} is not a valid gender',
            }),
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not valid email' })
                .min(1, { message: 'Email is required' }),
            contactNo: zod_1.z.string().min(1, { message: 'Contact number is required' }),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, { message: 'Emergency contact number is required' }),
            dateOfBirth: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, { message: 'Present address is required' }),
            permanentAddress: zod_1.z.string(),
            admissionSemester: zod_1.z.string(),
            guardian: studentGuardianSchema,
            academicDepartment: zod_1.z.string(),
            localGuardian: studentLocalGuardianSchema.optional(),
        }),
    }),
});
// type Student = z.infer<typeof studentValidationSchema>;
// create Define the name schema
const updateStudentNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .refine((value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
    }, { message: '{VALUE} is not capitalize formate' })
        .optional(),
    secondName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name is required' })
        .refine((value) => validator_1.default.isAlpha(value), {
        message: '{VALUE} is number. Do not use number',
    })
        .optional(),
});
//update Define the guardian schema
const updateStudentGuardianSchema = zod_1.z.object({
    fatherName: zod_1.z
        .string()
        .min(1, { message: "Father's name is required" })
        .optional(),
    fatherOccupation: zod_1.z
        .string()
        .min(1, { message: "Father's occupation is required" })
        .optional(),
    fatherContactNo: zod_1.z
        .string()
        .min(1, { message: "Father's contact number is required" })
        .optional(),
    motherName: zod_1.z
        .string()
        .min(1, { message: "Mother's name is required" })
        .optional(),
    motherOccupation: zod_1.z
        .string()
        .min(1, { message: "Mother's occupation is required" })
        .optional(),
    motherContactNo: zod_1.z
        .string()
        .min(1, { message: "Mother's contact number is required" })
        .optional(),
});
// Define Update the local guardian schema
const updateStudentLocalGuardianSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: "Local guardian's name is required" })
        .optional(),
    occupation: zod_1.z
        .string()
        .min(1, { message: "Local guardian's occupation is required" })
        .optional(),
    contactNo: zod_1.z
        .string()
        .min(1, { message: "Local guardian's contact number is required" })
        .optional(),
    address: zod_1.z
        .string()
        .min(1, { message: "Local guardian's address is required" })
        .optional(),
});
// Define update the main student schema
const updateStudentValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string()
            .max(20, { message: 'Password cannot exceed 20 characters' })
            .min(1, { message: 'Password is required' })
            .optional(),
        student: zod_1.z.object({
            name: updateStudentNameSchema.optional(),
            gender: zod_1.z
                .enum(['male', 'female', 'others'], {
                message: '{VALUE} is not a valid gender',
            })
                .optional(),
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not valid email' })
                .min(1, { message: 'Email is required' })
                .optional(),
            contactNo: zod_1.z
                .string()
                .min(1, { message: 'Contact number is required' })
                .optional(),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, { message: 'Emergency contact number is required' })
                .optional(),
            dateOfBirth: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, { message: 'Present address is required' })
                .optional(),
            permanentAddress: zod_1.z.string().optional(),
            admissionSemester: zod_1.z
                .string()
                .optional(),
            guardian: updateStudentGuardianSchema.optional(),
            profileImg: zod_1.z.string().optional(),
            localGuardian: updateStudentLocalGuardianSchema.optional(),
        }),
    }),
});
// Export the schema to be used elsewhere in your project
exports.stu_Zod_Valid_Schema = {
    createStudentValidation,
    updateStudentValidation,
};
