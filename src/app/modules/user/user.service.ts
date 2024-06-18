/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import config from '../../config';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId, generatedFacultyId } from './user.utils';

const createStudentIntoDB = async (
  password: string,
  payLoad: Student,
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
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester);


  // transaction rollback start

  const session = await mongoose.startSession(); // create a session

  try {
    session.startTransaction(); // start session

    // set student ID
    if (!admissionSemester) {
      throw new AppError(400, "Not found admissionSemester!")
    } else {
      userData.id = await generateStudentId(admissionSemester);
    }


    // create a user(transaction-1)
    const newUser = await User.create([userData], { session }); // session e data array hisebe dite hobe

    if (!newUser.length) {
      throw new AppError(400, "Failed to create user")
    }
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;

    // create a student(transaction-2)
    const newStudent = await StudentModel.create([payLoad], { session });
    if (!newStudent) {
      throw new AppError(400, "Failed to create student")
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;

  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyInDB = async (password: string, payLoad: TFaculty) => {

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  userData.role = 'faculty';

  
  const academicDepartment = await AcademicDepartment.findById(payLoad.academicDepartment);
 

  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // start session
    
    // set student ID
    if (!academicDepartment) {
      throw new AppError(400, "Not found academic department!")
    }
    const userDataId = await generatedFacultyId();
    if (!userDataId) {
      throw new AppError(400, "Not found userData Id!")
    }
    userData.id = userDataId;

  

    // create a user(transaction-1)
    
    const newUser = await User.create([userData], { session });
    

    if (!newUser.length) {
      throw new AppError(400, "Failed to create user")
    }
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;

    // create a student(transaction-2)
    const newFaculty = await Faculty.create([payLoad], { session });
    if (!newFaculty) {
      throw new AppError(400, "Failed to create student")
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;

  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
}

export const userService = {
  createStudentIntoDB,
  createFacultyInDB
};
