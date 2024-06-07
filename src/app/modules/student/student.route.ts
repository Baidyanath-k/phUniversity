import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/get_all_students', StudentControllers.getAllStudentsController);
router.get(
  '/find_student/:studentId',
  StudentControllers.getSingleStudentByIdController,
);

export const StudentRoutes = router;
