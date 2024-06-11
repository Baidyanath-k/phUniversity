import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { stu_Zod_Valid_Schema } from '../student/student.validate';
import { userControllers } from './user.controller';

const router = express.Router();

// create student router
router.post(
  '/create_student',
  requestValidate(stu_Zod_Valid_Schema.createStudentValidation),
  userControllers.createStudent,
);

export const createUserRoutes = router;
