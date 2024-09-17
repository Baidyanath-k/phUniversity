import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { searchAbleFields } from './student.const';
import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Find ALL Students form MongoDB
// const getAllStudentDB = async (query: Record<string, unknown>) => {
//   const studentQuery = new QueryBuilder(
//     StudentModel.find()
//       .populate('user')
//       .populate('admissionSemester')
//       .populate({
//         path: 'academicDepartment',
//         populate: {
//           path: 'refAcademicFaculty',
//         },
//       }),
//     query
//   ).search(searchAbleFields).filter().sort().paginate().fields();

//   const meta = studentQuery.countTotal();
//   const result = studentQuery.modelQuery;

//   return {
//     meta,
//     result
//   };
// };

const getAllStudentDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// search student form MongoDB
const searchStudentDB = async (query: Record<string, unknown>) => {
  const searchTerm = ['email', 'name.firstName', 'presentAddress'];
  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

// Find One Student By (custom made ID) ID form MongoDB
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id }).populate('user')
    .populate('admissionSemester')
    .populate('academicDepartment academicFaculty');
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
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to deleted student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed to deleted student');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to deleted student and error');
  }
};

// Update Student By (custom made ID) ID form MongoDB
const updateStudentInDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  /*
    guarding:{
      fatherOccupation:"teacher"
    }
  
    **convert to

    guarding.fatherOccupation = teacher
  */

  const modifyStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyStudentData[`localGuardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifyStudentData,
    { new: true, runValidators: true },
  );
  return result;
};
export const StudentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
  searchStudentDB,
};
