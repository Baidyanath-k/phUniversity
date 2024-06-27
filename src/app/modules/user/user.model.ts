/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, 'ID Must be required'],
      unique: true,
    },
    password: {
      type: String,
      max: 20,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

UserSchema.post('save', async function (doc, next) {
  doc.password = ' ';
  next();
});

UserSchema.statics.isUserExistsByCustomID = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const User = model<TUser, UserModel>('User', UserSchema);
