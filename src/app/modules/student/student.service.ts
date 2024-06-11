import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import { User } from '../user/user.model';
import { StudentModel } from './student.model';

const getAllStudentDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(400, "Failed to deleted student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(400, "Failed to deleted student");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }


}
export const StudentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
