import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.const';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'User First Name must be required')
    .max(20, 'First name can not be more than 20 characters')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z
    .string()
    .trim()
    .max(20, 'Middle name can not be more than 20 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'User Last Name must be required')
    .max(20, 'Last name can not be more than 20 characters'),
});

const createFacultyValidateSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      designation: z.string().min(1, 'Faculty Designation is required!!'),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('{VALUE} is not valid email')
        .min(1, 'Email must be required!!'),
      contactNo: z.string().min(1, 'Contact No. Must be required!!'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact No. Must be required!!'),
      presentAddress: z.string().min(1, 'Present Address required!!'),
      permanentAddress: z.string().min(1, 'Permanent Address required!!'),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional().default(false),
      academicDepartment: z
        .string()
        .min(1, 'Academic Department ID is required'),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'User First Name must be required')
    .max(20, 'First name can not be more than 20 characters')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z
    .string()
    .trim()
    .max(20, 'Middle name can not be more than 20 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'User Last Name must be required')
    .max(20, 'Last name can not be more than 20 characters')
    .optional(),
});

const updateFacultyValidateSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z
        .string()
        .min(1, 'Faculty Designation is required!!')
        .optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('{VALUE} is not valid email')
        .min(1, 'Email must be required!!')
        .optional(),
      contactNo: z.string().min(1, 'Contact No. Must be required!!').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact No. Must be required!!')
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present Address required!!')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address required!!')
        .optional(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional().default(false).optional(),
      academicDepartment: z
        .string()
        .min(1, 'Academic Department ID is required')
        .optional(),
    }),
  }),
});

export const FacultyZodValidations = {
  createFacultyValidateSchema,
  updateFacultyValidateSchema,
};
