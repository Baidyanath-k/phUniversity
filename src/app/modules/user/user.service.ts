import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import config from '../../config';
import { AcademicModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (
  password: string,
  userStudentData: Student,
) => {
  // create user->student
  const userData: Partial<TUser> = {};


  // If password not given then set default password
  if (!password) {
    password = config.default_pass as string;
  } else {
    userData.password = password;
  }

  // set role = student
  userData.role = 'student';

  // find ID by academic semester
  const admissionSemester = await AcademicModel.findById(
    userStudentData.admissionSemester,
  );

  // transaction rollback start

  const session = await mongoose.startSession(); // create a session

  try {
    session.startTransaction(); // start session

    // set student ID
    userData.id = await generateStudentId(admissionSemester as any);

    // create a user(transaction-1)
    const newUser = await User.create([userData], { session }); // session e data array hisebe dite hobe

    if (!newUser.length) {
      throw new AppError(400, "Failed to create user")
    }
    userStudentData.id = newUser[0].id;
    userStudentData.user = newUser[0]._id;

    // create a student(transaction-2)
    const newStudent = await StudentModel.create({ userStudentData }, { session });
    if (!newStudent) {
      throw new AppError(400, "Failed to create student")
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }


};

export const userService = {
  createStudentIntoDB,
};
