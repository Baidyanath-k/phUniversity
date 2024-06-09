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
