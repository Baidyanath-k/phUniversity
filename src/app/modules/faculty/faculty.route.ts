import express from 'express';
import authValidate from '../../utils/authValidation';
import { facultiesController } from './faculty.controller';

const router = express.Router();

router.get(
    '/get-all-faculty',
    authValidate(),
    facultiesController.getAllFacultiesCont
);
router.get('/get-single-faculty/:id', facultiesController.singleFacultyCont);
router.get('/faculty-search', facultiesController.searchFacultyCont);

export const facultyRoutes = router;
