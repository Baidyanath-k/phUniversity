import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { StudentControllers } from './student.controller';
import { stu_Zod_Valid_Schema } from './student.validate';


const router = express.Router();

router.get('/get_all_students', StudentControllers.getAllStudentsController);
router.get(
  '/find_student/:studentId',
  StudentControllers.getSingleStudentByIdController,
);

router.delete('/delete-student/:studentId', StudentControllers.deleteStudentCont);
router.patch(
  '/update-student/:studentId',
  requestValidate(stu_Zod_Valid_Schema.updateStudentValidation),
  StudentControllers.updateStudentCont
)

export const StudentRoutes = router;
