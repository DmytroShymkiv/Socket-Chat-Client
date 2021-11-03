export interface IUserBody {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ICreateUserBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILoginUserBody {
  email: string;
  password: string;
}
