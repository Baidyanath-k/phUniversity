"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterZodSchema = void 0;
const zod_1 = require("zod");
const academicSemester_const_1 = require("./academicSemester.const");
const createAcademicSemZodValidSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_const_1.AcademicSemNameModel]),
        year: zod_1.z.string(),
        code: zod_1.z.enum([...academicSemester_const_1.AcademicSemCodeModel]),
        startTMonth: zod_1.z.enum([...academicSemester_const_1.months]),
        endTMonth: zod_1.z.enum([...academicSemester_const_1.months]),
    }),
});
exports.AcademicSemesterZodSchema = {
    createAcademicSemZodValidSchema,
};
