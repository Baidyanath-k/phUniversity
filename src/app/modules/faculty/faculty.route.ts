import express from 'express';
import authValidate from '../../utils/authValidation';
import { USER_ROLE } from '../user/user.const';
import { facultiesController } from './faculty.controller';

const router = express.Router();

router.get(
    '/get-all-faculty',
    authValidate(USER_ROLE.admin),
    facultiesController.getAllFacultiesCont
);
router.get('/get-single-faculty/:id', facultiesController.singleFacultyCont);
router.get('/faculty-search', facultiesController.searchFacultyCont);

export const facultyRoutes = router;
