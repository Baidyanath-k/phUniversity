import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyInDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesInDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyByID = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyInDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyInDB,
  getAllAcademicFacultiesInDB,
  getSingleAcademicFacultyByID,
  updateAcademicFacultyInDB,
};
