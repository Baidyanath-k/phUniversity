import { z } from 'zod';

// Define the Zod schema for PreRequisiteCourses
const createPreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Define the Zod schema for Course
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.string(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(createPreRequisiteCourseValidationSchema)
      .optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
  }),
});
const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
