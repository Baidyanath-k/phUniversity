/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'inprogress' | 'blocked';
  isDeleted: false;
};

export type TNewUser = {
  role: string;
  password: string;
  id: string;
};


export type TUserRole = keyof typeof USER_ROLE;


// use statics method : function definition, actual final declare "Model"
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomID(id: string): Promise<TUser>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>
};