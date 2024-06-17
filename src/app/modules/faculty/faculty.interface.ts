import { Types } from "mongoose";

export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TGender = ['male' | 'female' | 'others'];

export type TBloodGroup = [| 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'];

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TName;
    gender: TGender;
    bloodGroup: TBloodGroup;
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
    academicDepartment: Types.ObjectId

}