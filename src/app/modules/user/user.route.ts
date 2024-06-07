import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { stu_Zod_Valid_Schema } from '../student/student.validate';
import { studentControllers } from './user.controller';

const router = express.Router();

// create student router
router.post(
  '/create_student',
  requestValidate(stu_Zod_Valid_Schema.createStudentValidation),
  studentControllers.createStudent,
);

export const createUserRoutes = router;
