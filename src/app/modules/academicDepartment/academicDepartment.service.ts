import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentInDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result
}

const getAllAcademicDepartmentInDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentByIdInDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

const updateAcademicDepartmentByIdInDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result;
}




export const academicDepartmentService = {
    createAcademicDepartmentInDB,
    getAllAcademicDepartmentInDB,
    getSingleAcademicDepartmentByIdInDB,
    updateAcademicDepartmentByIdInDB
}