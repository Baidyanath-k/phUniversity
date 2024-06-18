import express from "express";
import { facultiesController } from "./faculty.controller";


const router = express.Router();

router.get('/get-all-faculty', facultiesController.getAllFacultiesCont);
router.get('/get-single-faculty/:id', facultiesController.singleFacultyCont);

export const facultyRoutes = router;