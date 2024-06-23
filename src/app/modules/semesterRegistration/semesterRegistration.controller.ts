import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistrationCont = catchAsync(async (req, res) => {
    const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Semester registration create successfully',
        data: result,
    });
})

export const semesterRegistrationController = {
    createSemesterRegistrationCont
}