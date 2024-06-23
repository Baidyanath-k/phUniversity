import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistrationCont = catchAsync(async (req, res) => {
    const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Semester registration create successfully',
        data: result,
    });
});

const getAllSemesterRegistrationCont = catchAsync(async (req, res) => {
    const result = await semesterRegistrationService.getAllSemesterRegistrationFormDB(req.query);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All Semester registration get successfully',
        data: result,
    });
});

const getSingleSemesterRegistrationCont = catchAsync(async (req, res) => {
    const { semesterRegistrationID } = req.params;
    const result = await semesterRegistrationService.getSingleSemesterRegistrationFormDB(semesterRegistrationID);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Single Semester registration get successfully',
        data: result,
    });
});

const updateSemesterRegistrationCont = catchAsync(async (req, res) => {
    const { semesterRegistrationID } = req.params;
    const result = await semesterRegistrationService.updateSemesterRegistrationInDB(semesterRegistrationID, req.body);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Update Semester registration successfully',
        data: result,
    });
});

export const semesterRegistrationController = {
    createSemesterRegistrationCont,
    getAllSemesterRegistrationCont,
    getSingleSemesterRegistrationCont,
    updateSemesterRegistrationCont
}