import { StatusCodes } from "http-status-codes";
import AppError from "../../appError/appError";
import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistraion.interface";
import { RegistrationStatus } from "./semesterRegistration.const";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;
    const newStatus = payload?.status;

    // check: already "UPCOMING"/"ONGOING" register semester
    // Fetch any existing "ONGOING" or "UPCOMING" semesters
    const existingOngoingSemester = await SemesterRegistration.findOne({ status: RegistrationStatus.ONGOING });
    const existingUpcomingSemester = await SemesterRegistration.findOne({ status: RegistrationStatus.UPCOMING });

    // Logic to handle creation of "ONGOING" or "UPCOMING" semesters based on the existing ones
    if (newStatus === RegistrationStatus.ONGOING) {
        // If there is already an "ONGOING" semester, don't allow another "ONGOING" semester
        if (existingOngoingSemester) {
            throw new AppError(StatusCodes.BAD_REQUEST, "There is already an ONGOING register semester!");
        }
        // If there is no "UPCOMING" semester, don't allow an "ONGOING" semester
        if (!existingUpcomingSemester) {
            throw new AppError(StatusCodes.BAD_REQUEST, "You cannot register an ONGOING semester without an UPCOMING semester!");
        }
    } else if (newStatus === RegistrationStatus.UPCOMING) {
        // If there is already an "UPCOMING" semester, don't allow another "UPCOMING" semester
        if (existingUpcomingSemester) {
            throw new AppError(StatusCodes.BAD_REQUEST, "There is already an UPCOMING register semester!");
        }
    }

    // validation Academic semester
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);

    if (!isAcademicSemesterExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Academic semester is not found!!");
    };



    // validation semester registration: semester already exist ot not
    const isSemesterRegistrationExits = await SemesterRegistration.findOne({ academicSemester });

    if (isSemesterRegistrationExits) {
        throw new AppError(StatusCodes.CONFLICT, "This semester already exists!!")
    };

    const result = (await SemesterRegistration.create(payload)).populate("academicSemester");
    return result;
};


// Find all semester
const getAllSemesterRegistrationFormDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();

    const meta = await semesterRegistrationQuery.countTotal();
    const result = await semesterRegistrationQuery.modelQuery;
    return {
        meta,
        result
    };

};

const getSingleSemesterRegistrationFormDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester');
    return result;
};

const updateSemesterRegistrationInDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    // check semester register
    const isSemesterRegistrationExits = await SemesterRegistration.findById(id);

    if (!isSemesterRegistrationExits) {
        throw new AppError(StatusCodes.NOT_FOUND, `This semester registration not found!!`);
    };

    // if semester registration data status:ended then data do not update

    const currentSemesterStatus = isSemesterRegistrationExits?.status;

    if (currentSemesterStatus === "ENDED") {
        throw new AppError(StatusCodes.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    };


    // UPCOMING --> ONGOING --> ENDED
    const requestedStatus = payload?.status;

    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)
    };

    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`)
    };

    // finally send update data
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;

}
export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFormDB,
    getSingleSemesterRegistrationFormDB,
    updateSemesterRegistrationInDB
}