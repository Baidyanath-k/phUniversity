import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodSchema } from './academicSemesterZodValidation';

const router = express.Router();

// create academic semester
router.post(
  '/create_academic_sem',
  requestValidate(AcademicSemesterZodSchema.createAcademicSemZodValidSchema),
  AcademicSemesterController.createAcademicSemCont,
);

export const AcademicSemesterRoutes = router;
