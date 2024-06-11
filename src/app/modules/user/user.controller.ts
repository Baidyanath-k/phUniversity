import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;
  const result = await userService.createStudentIntoDB(password, userData);

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
