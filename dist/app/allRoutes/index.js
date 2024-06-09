"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.createUserRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/academic_semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.academicDepartRoutes,
    },
];
moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
exports.default = router;
