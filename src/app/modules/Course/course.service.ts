import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

const findAllCoursesFormDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(courseSearchFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
};

const findSingleCourseFormDB = async (id: string) => {
    const result = await Course.findById(id);
    return result;
};

const deleteCourseFormDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

const updateCourseInDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const updateBasicInformation = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new: true,
            runValidators: true,
        },
    );

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        const deletePrerequisites = preRequisiteCourses
            .filter((el) => el.course && el.isDeleted)
            .map((el) => el.course);

        await Course.findByIdAndUpdate(id, {
            $pull: { preRequisiteCourses: { course: { $in: deletePrerequisites } } },
        });
    }
    return updateBasicInformation;
};

export const courseServices = {
    createCourseIntoDB,
    findAllCoursesFormDB,
    findSingleCourseFormDB,
    deleteCourseFormDB,
    updateCourseInDB,
};
