import express from "express";
import requestValidate from "../../utils/validateRequest";
import { offeredCourseController } from "./OfferedCourse.controller";
import { offeredCourseValidation } from "./OfferedCourse.validation";

const router = express.Router();

router.post(
    '/create-offered-course',
    requestValidate(offeredCourseValidation.createOfferedCourseValidationSchema),
    offeredCourseController.createOfferedCourseCont
)


export const offeredCourseRoutes = router;