export type TUser = {
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
