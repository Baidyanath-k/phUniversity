import {
  TAcademicSemCode,
  TAcademicSemName,
  TAcademicSemesterCodeAndNameValidate,
  TMonth,
} from './academicSemester.interface';

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemNameModel: TAcademicSemName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemCodeModel: TAcademicSemCode[] = ['01', '02', '03'];

export const academicSemesterCodeAndNameValidate: TAcademicSemesterCodeAndNameValidate =
  {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
