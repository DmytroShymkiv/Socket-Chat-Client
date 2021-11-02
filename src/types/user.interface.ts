export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export interface IUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secretKey: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

