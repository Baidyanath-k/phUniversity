import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";

const createCourseCont = catchAsync(async (req, res) => {
    const result = await courseServices.createCourseIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Course create successfully',
        data: result,
    });
});

const findAllCoursesCont = catchAsync(async (req, res) => {
    const result = await courseServices.findAllCoursesFormDB(req.query);
    res.status(200).json({
        success: true,
        message: 'All corses find successfully',
        data: result,
    });
});

const findSingleCourseCont = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result = await courseServices.findSingleCourseFormDB(courseId);
    res.status(200).json({
        success: true,
        message: 'Single course find successfully',
        data: result,
    });
});

const deleteCourseCont = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result = await courseServices.deleteCourseFormDB(courseId);
    res.status(200).json({
        success: true,
        message: 'Course delete successfully',
        data: result,
    });
});


export const courseControllers = {
    createCourseCont,
    findAllCoursesCont,
    findSingleCourseCont,
    deleteCourseCont
}