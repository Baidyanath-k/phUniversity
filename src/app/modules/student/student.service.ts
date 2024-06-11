import { StudentModel } from './student.model';

const getAllStudentDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
}
export const StudentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
