import { z } from 'zod';
import { AdminBloodGroup, AdminGender } from './admin.const';

const createAdminNameValidateSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      designation: z.string(),
      name: createAdminNameValidateSchema,
      gender: z.enum([...AdminGender] as [string, ...string[]]),
      bloodGroup: z
        .enum([...AdminBloodGroup] as [string, ...string[]])
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateAdminNameValidateSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      designation: z.string().optional(),
      name: updateAdminNameValidateSchema.optional(),
      gender: z.enum([...AdminGender] as [string, ...string[]]).optional(),
      bloodGroup: z
        .enum([...AdminBloodGroup] as [string, ...string[]])
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const adminZodValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
