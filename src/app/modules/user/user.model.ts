/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'ID Must be required'],
      unique: true,
    },
    password: {
      type: String,
      max: 20,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['inprogress', 'blocked'],
      default: 'inprogress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error: any) {
    next(error)
  }

});

UserSchema.post('save', async function (doc, next) {
  try {
    // console.log(doc.password);
    doc.password = ' ';
    next();
  } catch (error: any) {
    next(error)
  }
});

export const User = model<TUser>('User', UserSchema);
