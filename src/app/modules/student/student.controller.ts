import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getAllStudentsController = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentDB();
  res.status(200).json({
    success: true,
    message: 'Student is get successfully',
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
})

export const StudentControllers = {
  getAllStudentsController,
  getSingleStudentByIdController,
  deleteStudentCont
};
