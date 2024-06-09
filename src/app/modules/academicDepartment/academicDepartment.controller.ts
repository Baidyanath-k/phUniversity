import catchAsync from "../../utils/catchAsync";
import { academicDepartmentService } from "./academicDepartment.service";


const createAcademicDepartmentCont = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.createAcademicDepartmentInDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic department create successfully',
        data: result,
    });
});

const getAllAcademicDepartmentCont = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.getAllAcademicDepartmentInDB();
    res.status(200).json({
        success: true,
        message: 'Find all academic departments successfully',
        data: result,
    });
});

const getSingleAcademicDepartmentCont = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.getSingleAcademicDepartmentByIdInDB(departmentId);
    res.status(200).json({
        success: true,
        message: 'Find single academic department successfully',
        data: result,
    });
});

const updateAcademicDepartmentCont = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartmentByIdInDB(departmentId, req.body);
    res.status(200).json({
        success: true,
        message: 'Academic department update successfully',
        data: result,
    });
})




export const academicDepartmentController = {
    createAcademicDepartmentCont,
    getAllAcademicDepartmentCont,
    getSingleAcademicDepartmentCont,
    updateAcademicDepartmentCont
}