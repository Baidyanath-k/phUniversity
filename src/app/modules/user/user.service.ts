import config from '../../config';
import { AcademicModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (
  password: string,
  userStudentData: Student,
) => {
  // create user->student
  const userData: Partial<TUser> = {};
  // If password not given then set default password
  if (!password) {
    password = config.default_pass as string;
  } else {
    userData.password = password;
  }

  // set role = student
  userData.role = 'student';

  // find ID by academic semester
  const admissionSemester = await AcademicModel.findById(
    userStudentData.admissionSemester,
  );

  // set student ID
  userData.id = await generateStudentId(admissionSemester as any);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    userStudentData.id = newUser.id;
    userStudentData.user = newUser._id;

    const newStudent = await StudentModel.create(userStudentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
