import { StatusCodes } from 'http-status-codes';
import AppError from '../../appError/appError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Find Last Student ID
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// automatic student ID create (semester year, semester code, 4 digit code)
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};


// created Faculty ID

const findLastFacultyId = async () => {
  const currentID = (0).toString();
  const lastFacultyID = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  if (lastFacultyID?.id) {
    return lastFacultyID.id.substring(2);
  } else {
    return currentID;
  }
};

export const generatedFacultyId = async () => {

  let facultyID = await findLastFacultyId();
  if (!facultyID) {
    throw new AppError(500, 'Not found last faculty ID!');
  }

  if (facultyID) {
    facultyID = facultyID.substring(2);
  }

  let incrementId = (Number(facultyID) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};

const findLastAdminId = async () => {
  const currentID = (0).toString();
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();


  return lastAdmin?.id ? lastAdmin.id.substring(2) : currentID;
};

export const generatedAdminId = async () => {


  let adminId = await findLastAdminId();
  if (!adminId) {
    throw new AppError(StatusCodes.NOT_FOUND, "Last Admin Id is not found!")
  }

  if (adminId) {
    adminId = adminId.substring(2);
  }

  let incrementId = (Number(adminId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
