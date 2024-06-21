import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { adminZodValidation } from '../admin/admin.validation';
import { FacultyZodValidations } from '../faculty/faculty.validate';
import { stu_Zod_Valid_Schema } from '../student/student.validate';
import { userControllers } from './user.controller';

const router = express.Router();

// create student router
router.post(
  '/create_student',
  requestValidate(stu_Zod_Valid_Schema.createStudentValidation),
  userControllers.createStudent,
);

// create faculty router
router.post(
  '/create_faculty',
  requestValidate(FacultyZodValidations.createFacultyValidateSchema),
  userControllers.createFaculty,
);

// create admin router
router.post(
  '/create_admin',
  requestValidate(adminZodValidation.createAdminValidationSchema),
  userControllers.createAdminCont,
);

export const createUserRoutes = router;
