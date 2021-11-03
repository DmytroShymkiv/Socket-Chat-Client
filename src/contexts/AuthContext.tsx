import React, { useContext, useState, useEffect, FC } from "react";

import AuthService from "../services/AuthService";
import { IError } from "../types/error.type";
import { ILoginBody, IUser, IUserBody } from "../types/user.types";

interface IContextValue {
  currentUser: IUser | null;
  checkEmail: (email: string) => Promise<boolean | IError>;
  loginAuthorization: ({
    email,
    password,
  }: ILoginBody) => Promise<boolean | IError>;
  createUser: (user: IUserBody) => Promise<boolean | IError>;
  loginUser: (secretKey: string) => Promise<boolean | IError>;
  logout: () => void;
}

const AuthContext = React.createContext<IContextValue>({} as IContextValue);

export function useAuth(): IContextValue {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const response = await AuthService.loadUser();
    response && setCurrentUser(response);
    setLoading(false);
  }

  const createUser = async (user: IUserBody) => {
    const response = await AuthService.createUser(user);
    const { errors } = response as IError;
    !errors && (await loadUser());
    return response;
  };

  const loginUser = async (secretKey: string) => {
    const response = await AuthService.loginUser(secretKey);
    const { errors } = response as IError;
    !errors && (await loadUser());
    return response;
  };

  const checkEmail = (email: string) => {
    return AuthService.checkEmail(email);
  };

  const loginAuthorization = ({ email, password }: ILoginBody) => {
    return AuthService.loginAuthorization({ email, password });
  };

  const logout = () => {
    setCurrentUser(null);
    AuthService.logout();
  };

  const value: IContextValue = {
    currentUser,
    checkEmail,
    loginAuthorization,
    createUser,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
