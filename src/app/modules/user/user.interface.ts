/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'inprogress' | 'blocked';
  isDeleted: false;
};

export type TNewUser = {
  role: string;
  password: string;
  id: string;
};


// use statics method : function definition, actual final declare "Model"
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomID(id: string): Promise<TUser>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>
}