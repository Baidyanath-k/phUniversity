import { StatusCodes } from "http-status-codes";
import AppError from "../../appError/appError";
import { Course } from "../Course/course.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;

    // check semesterRegistration
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Semester registration is not found!");
    };

    // find academicSemester;
    const isAcademicSemesterExists = isSemesterRegistrationExists.academicSemester;

    // check academicFaculty
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Academic Faculty is not found!");
    };

    // check academicDepartment
    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Academic Department is not found!");
    };

    // check course
    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Course is not found!");
    };

    // check faculty
    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Faculty is not found!");
    };

    // check if the department is belong to the  faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne(
        {
            refAcademicFaculty: academicFaculty,
            academicDepartment: academicDepartment
        }
    );
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(StatusCodes.NOT_FOUND, `This ${isAcademicDepartmentExists.name} is not  belong to this ${isAcademicFacultyExists.name}`);
    };

    // check if the same offered course same section in same registered semester exists

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
        await OfferedCourse.findOne({
            semesterRegistration,
            course,
            section,
        });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `Offered course with same section is already exist!`,
        );
    };

    // check faculty schedule
    const assignedSchedule = await OfferedCourse.find(
        {
            semesterRegistration,
            faculty,
            days: { $in: days }
        }
    ).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    };

    if (hasTimeConflict(assignedSchedule, newSchedule)) {
        throw new AppError(StatusCodes.CONFLICT, "This faculty is not available that time ! Choose other time or day........")
    }



    // set Academic Semester
    payload.academicSemester = isAcademicSemesterExists;

    // create Offered course
    const result = await OfferedCourse.create(payload);
    return result;
};

const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {

    const { faculty, days, startTime, endTime } = payload;

    // check offered course is exists
    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Offered Course is not found!");
    };

    // check faculty is exists
    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Faculty is not found!");
    };


    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(StatusCodes.BAD_REQUEST, `Offered course can not update ! because the semester ${semesterRegistrationStatus?.status}`);
    }
    // schedule check
    const assignedSchedule = await OfferedCourse.find(
        {
            semesterRegistration,
            faculty,
            days: { $in: days }
        }
    ).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    };

    if (hasTimeConflict(assignedSchedule, newSchedule)) {
        throw new AppError(StatusCodes.CONFLICT, "This faculty is not available that time ! Choose other time or day........")
    };

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return result;
}



export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    updateOfferedCourseIntoDB
};