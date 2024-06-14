import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import { User } from '../user/user.model';
import { Student } from './student.interface';
import { StudentModel } from './student.model';


// Find ALL Students form MongoDB
const getAllStudentDB = async () => {
  const result = await StudentModel.find().populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'refAcademicFaculty',
      },
    });;
  return result;
};


// Find One Student By (custom made ID) ID form MongoDB
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};


// Delete Student By (custom made ID) ID form MongoDB
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
    throw new AppError(400, "Failed to deleted student and error");
  }
}

// Update Student By (custom made ID) ID form MongoDB
const updateStudentInDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  /*
    guarding:{
      fatherOccupation:"teacher"
    }

    guarding.fatherOccupation = teacher
  */

  const modifyStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyStudentData[`name.${key}`] = value;
    }
  };

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyStudentData[`guardian.${key}`] = value;
    }
  };

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyStudentData[`localGuardian.${key}`] = value;
    }
  };
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifyStudentData,
    { new: true, runValidators: true }
  );
  return result;
}
export const StudentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB
};
