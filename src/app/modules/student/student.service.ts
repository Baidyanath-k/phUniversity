import mongoose from 'mongoose';
import AppError from '../../appError/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Find ALL Students form MongoDB
const getAllStudentDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'refAcademicFaculty',
      },
    });
  return result;
};

// search student form MongoDB
const searchStudentDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // {email: {$regex: query.searchTerm, $option:i}}
  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchTerm = ['email', 'name.firstName', 'presentAddress']
  // const searchQuery = StudentModel.find({
  //   $or: searchTerm.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' }
  //   }))
  // })

  // FILTERING fUNCTIONALITY:
  // const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludesFields.forEach((el) => delete queryObj[el]);
  // const filterQuery = searchQuery.find(queryObj)

  // SORTING FUNCTIONALITY:
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort);

  // LIMIT FUNCTIONALITY:
  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // FIELDS FUNCTIONALITY:
  // fields = 'name,email' --> 'name email'

  // let fields = '-__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

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
