import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(password, studentData);

  const result = await userService.createStudentIntoDB(password, studentData);

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyInDB(password, facultyData);

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  });
})

export const userControllers = {
  createStudent,
  createFaculty
};
