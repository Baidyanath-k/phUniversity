import express from 'express';
import authValidate from '../../utils/authValidation';
import requestValidate from '../../utils/validateRequest';
import { adminZodValidation } from '../admin/admin.validation';
import { FacultyZodValidations } from '../faculty/faculty.validate';
import { stu_Zod_Valid_Schema } from '../student/student.validate';
import { USER_ROLE } from './user.const';
import { userControllers } from './user.controller';

const router = express.Router();

// create student router
router.post(
  '/create_student',
  authValidate(USER_ROLE.admin),
  requestValidate(stu_Zod_Valid_Schema.createStudentValidation),
  userControllers.createStudent,
);

// create faculty router
router.post(
  '/create_faculty',
  authValidate(USER_ROLE.admin, USER_ROLE.faculty),
  requestValidate(FacultyZodValidations.createFacultyValidateSchema),
  userControllers.createFaculty,
);

// create admin router
router.post(
  '/create_admin',
  authValidate(USER_ROLE.admin),
  requestValidate(adminZodValidation.createAdminValidationSchema),
  userControllers.createAdminCont,
);

export const createUserRoutes = router;
