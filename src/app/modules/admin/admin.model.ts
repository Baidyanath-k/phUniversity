import { Schema, model } from 'mongoose';
import validator from 'validator';
import { AdminBloodGroup, AdminGender } from './admin.const';
import { TAdmin, TAdminName } from './admin.interface';

const adminNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: [true, 'First name must be required!'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize formate!',
    },
  },
  middleName: {
    type: String,
    required: [true, 'Middle name must be required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be required!'],
    trim: true,
  },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'Admin ID is required!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required!'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required!'],
    },
    name: {
      type: adminNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: AdminGender,
        message: `{VALUE} is not valid gender`,
      },
      required: [true, 'Admin Gender is required!!'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: AdminBloodGroup,
        message: `{VALUE} is not valid blood group`,
      },
      required: [true, 'Blood group is required!!'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: '{VALUE} is not valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact no is required!'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact no is required!'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address no is required!'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address no is required!'],
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.statics.isUserExists = async function (id: string) {
  const exitingUser = await Admin.findOne({ id });
  return exitingUser;
};

export const Admin = model<TAdmin>('Admin', adminSchema);
