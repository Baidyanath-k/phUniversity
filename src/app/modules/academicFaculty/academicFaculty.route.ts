import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  requestValidate(
    academicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFacultyCont,
);
router.get(
  '/get-all-academic-faculties',
  academicFacultyController.getAllAcademicFacultiesCont,
);

router.get(
  '/get-single-academic-faculty/:academicFacultyId',
  academicFacultyController.getSingleAcademicFacultyCont,
);

router.patch(
  '/update-academic-faculty/:academicFacultyId',
  requestValidate(
    academicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateAcademicFacultyCont,
);

export const AcademicFacultyRoutes = router;
