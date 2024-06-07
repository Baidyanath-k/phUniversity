import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// Find Last Student ID
const lastStudentId = async () => {
    const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


// automatic student ID create (semester year, semester code, 4 digit code)
export const generateStudentId = async (payload: TAcademicSemester) => {
    const currentID = await lastStudentId() || (0).toString();
    let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementID = `${payload.year}${payload.code}${incrementID}`;
    return incrementID

}