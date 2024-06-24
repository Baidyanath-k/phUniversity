import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { OfferedCourseServices } from "./OfferedCourse.service";

const createOfferedCourseCont = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Offered course create successfully',
        data: result,
    });
});

const updateOfferedCourseCont = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Offered course update successfully',
        data: result,
    });
})


export const offeredCourseController = {
    createOfferedCourseCont,
    updateOfferedCourseCont
}