import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { semesterRegistrationValidate } from './semesterRegistraition.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
    '/create-semester-register',
    requestValidate(semesterRegistrationValidate.createSemesterRegistrationValidateSchema),
    semesterRegistrationController.createSemesterRegistrationCont
)


export const semesterRegistrationRoutes = router;