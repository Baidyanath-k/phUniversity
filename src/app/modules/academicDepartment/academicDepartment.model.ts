import { Schema, model } from 'mongoose';
import AppError from '../../appError/appError';
import { TAcademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic Department name must be required'],
      unique: true,
    },
    refAcademicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty must be required'],
      ref: 'academicFaculty',
    },
  },
  { timestamps: true },
);

// pre hook save data
AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(404, 'This department is already exists!');
  }
  next();
});

// pre hook update data
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentIdExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentIdExists) {
    throw new AppError(404, 'This department ID does not exists!');
  }

  next();
});

// mongoose model
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
