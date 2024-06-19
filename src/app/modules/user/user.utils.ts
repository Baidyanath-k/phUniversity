import AppError from '../../appError/appError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Find Last Student ID
const lastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// automatic student ID create (semester year, semester code, 4 digit code)
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentID = (0).toString();
  // 2030 01 0000
  const lastStudentIds = await lastStudentId();
  const lastSemesterYear = lastStudentIds?.substring(0, 4);
  const lastSemesterCode = lastStudentIds?.substring(4, 6);
  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;
  if (
    lastStudentIds &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    currentID = lastStudentIds.substring(6);
  }
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};

const findLastFacultyId = async () => {
  const lastFacultyID = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

  if (lastFacultyID?.id) {
    return lastFacultyID.id.substring(2);
  } else {
    return undefined;
  }
};


export const generatedFacultyId = async () => {
  let currentID = (0).toString();

  const lastFacultyID = await findLastFacultyId();
  if (!lastFacultyID) {
    throw new AppError(500, "Not found last faculty ID!")
  }

  if (lastFacultyID) {
    currentID = lastFacultyID.substring(2);
  }

  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;

};

const findLastAdminId = async () => {
  const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  if (lastAdminId?.id) {
    return lastAdminId.id.substring(2);
  } else {
    return undefined;
  }
};

export const generatedAdminId = async () => {
  let currentID = (0).toString();

  const lastAdminId = await findLastAdminId();
  if (!lastAdminId) {
    throw new AppError(500, "Not found last Admin ID!")
  }

  if (lastAdminId) {
    currentID = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');


  incrementId = `A-${incrementId}`;
  return incrementId;
}
