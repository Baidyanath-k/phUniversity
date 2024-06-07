import { Schema, model } from 'mongoose';
import {
  AcademicSemCodeModel,
  AcademicSemNameModel,
  months,
} from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemNameModel,
      required: [true, 'Semester name must be required'],
    },
    code: {
      type: String,
      enum: AcademicSemCodeModel,
      required: [true, 'Semester code must be required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year must be required'],
    },
    startTMonth: {
      type: String,
      enum: months,
      required: [true, 'Semester start month must be required'],
    },
    endTMonth: {
      type: String,
      enum: months,
      required: [true, 'Semester end month must be required'],
    },
  },
  { timestamps: true },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExistsInYear = await AcademicModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExistsInYear) {
    throw new Error(
      'A document with the same year and semester already exists.',
    );
  }
  next();
});

export const AcademicModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
