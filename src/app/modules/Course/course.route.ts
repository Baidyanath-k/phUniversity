import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  requestValidate(courseValidation.createCourseValidationSchema),
  courseControllers.createCourseCont,
);
router.get('/find-all-course', courseControllers.findAllCoursesCont);
router.get(
  '/find-single-course/:courseId',
  courseControllers.findSingleCourseCont,
);
router.delete('/delete-course/:courseId', courseControllers.deleteCourseCont);
router.patch(
  '/course-update/:courseId',
  requestValidate(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourseCont,
);

router.put(
  '/faculties/:courseId/assign-faculties',
  requestValidate(courseValidation.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourseCont
);


router.delete(
  '/faculties/:courseId/delete-faculties',
  requestValidate(courseValidation.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesWithCourseCont
);

export const courseRoutes = router;
