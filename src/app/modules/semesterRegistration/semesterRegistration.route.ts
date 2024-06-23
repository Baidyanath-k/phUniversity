import express from 'express';
import requestValidate from '../../utils/validateRequest';
import { semesterRegistrationValidate } from './semesterRegistraition.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
    '/create-semester-register',
    requestValidate(semesterRegistrationValidate.createSemesterRegistrationValidateSchema),
    semesterRegistrationController.createSemesterRegistrationCont
);

router.get(
    '/get-all-semester-register',
    semesterRegistrationController.getAllSemesterRegistrationCont
);


router.get(
    '/get-single-semester/:semesterRegistrationID',
    semesterRegistrationController.getSingleSemesterRegistrationCont
);

router.patch(
    '/update-semester-registration/:semesterRegistrationID',
    requestValidate(semesterRegistrationValidate.updateSemesterRegistrationValidateSchema),
    semesterRegistrationController.updateSemesterRegistrationCont
);

export const semesterRegistrationRoutes = router;