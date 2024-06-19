import { Types } from "mongoose";

export type TAdminName = {
    firstName: string;
    middleName: string;
    lastName: string
}

export type TAdminGender = 'male' | 'female' | 'other';
export type TAdminBloodGroup = | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TAdminName;
    gender: TAdminGender;
    bloodGroup?: TAdminBloodGroup;
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
}