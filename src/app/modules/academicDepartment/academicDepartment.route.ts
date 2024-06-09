import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  requestValidate(
    academicDepartmentValidation.CreateAcademicDepartmentValidation,
  ),
  academicDepartmentController.createAcademicDepartmentCont,
);

router.get(
  '/get-all-academic-departments',
  academicDepartmentController.getAllAcademicDepartmentCont,
);

router.get(
  '/get-single-academic-department/:departmentId',
  academicDepartmentController.getSingleAcademicDepartmentCont,
);

router.patch(
  '/update-academic-department/:departmentId',
  requestValidate(
    academicDepartmentValidation.UpdateAcademicDepartmentValidation,
  ),
  academicDepartmentController.updateAcademicDepartmentCont,
);

export const academicDepartRoutes = router;
