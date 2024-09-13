import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getAllStudentsController: RequestHandler = catchAsync(async (req, res) => {
  const { meta, result } = await StudentServices.getAllStudentDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All students is get successfully',
    meta,
    result,
  });
});

// search student controller
const searchStudentsController = catchAsync(async (req, res) => {
  const result = await StudentServices.searchStudentDB(req.query);
  res.status(200).json({
    success: true,
    message: 'search students is successfully',
    data: result,
  });
});

const getSingleStudentByIdController = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Single Student is get successfully',
    data: result,
  });
});

const deleteStudentCont = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student delete successfully',
    data: result,
  });
});

// update student controller
const updateStudentCont = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentInDB(studentId, student);
  res.status(200).json({
    success: true,
    message: 'Student update successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudentsController,
  getSingleStudentByIdController,
  deleteStudentCont,
  updateStudentCont,
  searchStudentsController,
};
