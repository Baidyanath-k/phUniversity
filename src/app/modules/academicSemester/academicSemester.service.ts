import { academicSemesterCodeAndNameValidate } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicModel } from './academicSemester.model';

const createAcademicSemesterInDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeAndNameValidate[payload.name] !== payload.code) {
    throw new Error('Semester name and code is invalid');
  }

  const result = await AcademicModel.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterInDB,
};
