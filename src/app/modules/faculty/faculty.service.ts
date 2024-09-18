import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';

const getAllFacultyIntoDB = async (query: Record<string, unknown>) => {
  const searchTerm = ['email', 'name.firstName', 'presentAddress'];
  const facultyQuery = new QueryBuilder(Faculty.find().populate("academicDepartment"), query)
    .search(searchTerm)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await facultyQuery.countTotal();
  const result = await facultyQuery.modelQuery;

  return { meta, result };
};

const getSingleFacultyInDB = async (id: string) => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('user');
  return result;
};

const getSearchFacultyInDB = async (query: Record<string, unknown>) => {
  const searchTerm = ['email', 'name.firstName', 'presentAddress'];
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;

  return result;
};

export const facultyServices = {
  getAllFacultyIntoDB,
  getSingleFacultyInDB,
  getSearchFacultyInDB,
};
