import { Types } from 'mongoose';

export type Name = {
  firstName: string;
  secondName?: string;
  lastName: string;
};
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  user: Types.ObjectId;
  name: Name;
  password: string;
  gender: 'male' | 'female' | 'others';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  admissionSemester: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId,
  localGuardian?: LocalGuardian;
};
