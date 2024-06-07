export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TAcademicSemName;
  code: TAcademicSemCode;
  year: string;
  startTMonth: TMonth;
  endTMonth: TMonth;
};

export type TAcademicSemesterCodeAndNameValidate = {
  [key: string]: string;
};
