import mongoose from 'mongoose';
import validator from 'validator';
import { z } from 'zod';

// mongoose ID validation
const objectIdValidation = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// create Define the name schema
const studentNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: '{VALUE} is not capitalize formate' },
    ),
  secondName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => validator.isAlpha(value), {
      message: '{VALUE} is number. Do not use number',
    }),
});

// Define the guardian schema
const studentGuardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
});

// Define the local guardian schema
const studentLocalGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }),
});

// Define the main student schema
const createStudentValidation = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .min(1, { message: 'Password is required' }),

    student: z.object({
      name: studentNameSchema,

      gender: z.enum(['male', 'female', 'others'], {
        message: '{VALUE} is not a valid gender',
      }),
      email: z
        .string()
        .email({ message: '{VALUE} is not valid email' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      dateOfBirth: z.date().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z.string(),
      admissionSemester: z
        .string()
        .refine(objectIdValidation, { message: 'Invalid ObjectId' }),
      guardian: studentGuardianSchema,
      profileImg: z.string().optional(),
      localGuardian: studentLocalGuardianSchema.optional(),
    }),
  }),
});

// type Student = z.infer<typeof studentValidationSchema>;

// create Define the name schema
const updateStudentNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: '{VALUE} is not capitalize formate' },
    ).optional(),
  secondName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => validator.isAlpha(value), {
      message: '{VALUE} is number. Do not use number',
    }).optional(),
});

//update Define the guardian schema
const updateStudentGuardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }).optional(),
  fatherOccupation: z
    .string().min(1, { message: "Father's occupation is required" }).optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }).optional(),
  motherName: z.string().min(1, { message: "Mother's name is required" }).optional(),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }).optional(),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }).optional(),
});

// Define Update the local guardian schema
const updateStudentLocalGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }).optional(),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }).optional(),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }).optional(),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }).optional(),
});


// Define update the main student schema
const updateStudentValidation = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .min(1, { message: 'Password is required' }).optional(),

    student: z.object({
      name: updateStudentNameSchema.optional(),

      gender: z.enum(['male', 'female', 'others'], {
        message: '{VALUE} is not a valid gender',
      }).optional(),
      email: z
        .string()
        .email({ message: '{VALUE} is not valid email' })
        .min(1, { message: 'Email is required' }).optional(),
      contactNo: z.string().min(1, { message: 'Contact number is required' }).optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }).optional(),
      dateOfBirth: z.date().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }).optional(),
      permanentAddress: z.string().optional(),
      admissionSemester: z
        .string()
        .refine(objectIdValidation, { message: 'Invalid ObjectId' }).optional(),
      guardian: updateStudentGuardianSchema.optional(),
      profileImg: z.string().optional(),
      localGuardian: updateStudentLocalGuardianSchema.optional(),
    }),
  }),
});

// Export the schema to be used elsewhere in your project
export const stu_Zod_Valid_Schema = {
  createStudentValidation,
  updateStudentValidation
};
