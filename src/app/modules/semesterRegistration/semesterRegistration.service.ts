import { StatusCodes } from "http-status-codes";
import AppError from "../../appError/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistraion.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    // validation Academic semester
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);

    if (!isAcademicSemesterExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Academic semester is not found!!");
    }

    // validation semester registration: semester already exist ot not
    const isSemesterRegistrationExits = await SemesterRegistration.findOne({ academicSemester });

    if (isSemesterRegistrationExits) {
        throw new AppError(StatusCodes.CONFLICT, "This semester already exists!!")
    }




    const result = await SemesterRegistration.create(payload);
    return result;
}



export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB
}