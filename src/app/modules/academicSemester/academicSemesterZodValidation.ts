import { z } from 'zod';
import {
  AcademicSemCodeModel,
  AcademicSemNameModel,
  months,
} from './academicSemester.const';

const createAcademicSemZodValidSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemNameModel] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemCodeModel] as [string, ...string[]]),
    startTMonth: z.enum([...months] as [string, ...string[]]),
    endTMonth: z.enum([...months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterZodSchema = {
  createAcademicSemZodValidSchema,
};
