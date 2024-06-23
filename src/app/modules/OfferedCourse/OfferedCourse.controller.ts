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


export const offeredCourseController = {
    createOfferedCourseCont
}