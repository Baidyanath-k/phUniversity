"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authValidation_1 = __importDefault(require("../../utils/authValidation"));
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.get('/get-all-faculty', (0, authValidation_1.default)(), faculty_controller_1.facultiesController.getAllFacultiesCont);
router.get('/get-single-faculty/:id', faculty_controller_1.facultiesController.singleFacultyCont);
router.get('/faculty-search', faculty_controller_1.facultiesController.searchFacultyCont);
exports.facultyRoutes = router;
