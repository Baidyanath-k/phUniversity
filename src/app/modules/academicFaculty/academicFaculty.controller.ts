import catchAsync from "../../utils/catchAsync";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFacultyCont = catchAsync(async (req, res) => {
    const result = await academicFacultyService.createAcademicFacultyInDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic faculty create successfully',
        data: result,
    });
})

const getAllAcademicFacultiesCont = catchAsync(async (req, res) => {
    const result = await academicFacultyService.getAllAcademicFacultiesInDB();
    res.status(200).json({
        success: true,
        message: 'Get all academic faculty successfully',
        data: result,
    });
})

const getSingleAcademicFacultyCont = catchAsync(async (req, res) => {
    const { academicFacultyId } = req.params;

    const result = await academicFacultyService.getSingleAcademicFacultyByID(academicFacultyId);
    res.status(200).json({
        success: true,
        message: 'Get single academic faculty successfully',
        data: result,
    });

})

const updateAcademicFacultyCont = catchAsync(async (req, res) => {
    const { academicFacultyId } = req.params;
    const result = await academicFacultyService.updateAcademicFacultyInDB(academicFacultyId, req.body);

    res.status(200).json({
        success: true,
        message: 'Update academic faculty successfully',
        data: result,
    });
})

export const academicFacultyController = {
    createAcademicFacultyCont,
    getAllAcademicFacultiesCont,
    getSingleAcademicFacultyCont,
    updateAcademicFacultyCont
}