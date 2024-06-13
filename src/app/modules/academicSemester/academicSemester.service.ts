import { academicSemesterCodeAndNameValidate } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeAndNameValidate[payload.name] !== payload.code) {
    throw new Error('Semester name and code is invalid');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterInDB,
};
