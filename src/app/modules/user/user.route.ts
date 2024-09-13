import express, { NextFunction, Request, Response } from 'express';
import authValidate from '../../utils/authValidation';
import { upload } from '../../utils/sendImageToClouderyMulter';
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
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
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
