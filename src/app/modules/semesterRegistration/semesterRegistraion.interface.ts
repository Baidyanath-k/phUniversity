import { Types } from "mongoose";

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ONGOING' | 'ENDED';
    startDate: Date;
    endDate: Date;
    minCredit: 3;
    maxCredit: 16;
}