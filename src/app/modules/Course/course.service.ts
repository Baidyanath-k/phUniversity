import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

const findAllCoursesFormDB = async () => {
    const result = await Course.find();
    return result;
};

const findSingleCourseFormDB = async (id: string) => {
    const result = await Course.findById(id);
    return result;
};

const deleteCourseFormDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}



export const courseServices = {
    createCourseIntoDB,
    findAllCoursesFormDB,
    findSingleCourseFormDB,
    deleteCourseFormDB
}