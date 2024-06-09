import { z } from 'zod';

const CreateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be string!',
    }),
  }),
});

const UpdateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be string!',
    }),
  }),
});

export const academicFacultyValidation = {
  CreateAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
