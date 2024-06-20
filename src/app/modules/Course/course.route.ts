import express from "express";
import requestValidate from "../../utils/validateRequest";
import { courseControllers } from "./course.controller";
import { courseValidation } from "./course.validation";

const router = express.Router();

router.post(
    '/create-course',
    requestValidate(courseValidation.createCourseValidationSchema),
    courseControllers.createCourseCont
);
router.get('/find-all-course', courseControllers.findAllCoursesCont);
router.get('/find-single-course/:courseId', courseControllers.findSingleCourseCont);
router.delete('/delete-course/:courseId', courseControllers.deleteCourseCont);



export const courseRoutes = router;