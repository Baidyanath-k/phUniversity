import express from 'express';
import requestValidate from '../../utils/validateRequest';
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

router.post(
  '/create_faculty',
  requestValidate(FacultyZodValidations.createFacultyValidateSchema),
  userControllers.createFaculty
)

export const createUserRoutes = router;
