import QueryBuilder from '../../builder/QueryBuilder';
import { academicSemesterCodeAndNameValidate, AcademicSemesterSearchableFields } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeAndNameValidate[payload.name] !== payload.code) {
    throw new Error('Semester name and code is invalid');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFormDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields).filter().sort().paginate().fields();
  

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    result,
    meta
  }
}

export const academicSemesterService = {
  createAcademicSemesterInDB,
  getAllAcademicSemesterFormDB
};
