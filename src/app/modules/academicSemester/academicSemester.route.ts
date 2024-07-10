import express from 'express';
import authValidate from '../../utils/authValidation';
import requestValidate from '../../utils/validateRequest';
import { USER_ROLE } from '../user/user.const';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodSchema } from './academicSemesterZodValidation';

const router = express.Router();

// create academic semester
router.post(
  '/create_academic_sem',
  requestValidate(AcademicSemesterZodSchema.createAcademicSemZodValidSchema),
  AcademicSemesterController.createAcademicSemCont,
);


router.get(
  '/academic-semesters',
  authValidate(USER_ROLE.admin),
  AcademicSemesterController.getAllAcademicSemCont
)

export const AcademicSemesterRoutes = router;
