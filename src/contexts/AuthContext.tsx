import React, { useContext, useState, useEffect, FC } from "react";

import AuthService from "../services/AuthService";
import { ILoginBody, IUser, IUserBody } from "../types/user.types";

interface IContextValue {
  currentUser: IUser | null;
  checkEmail: (email: string) => Promise<any>;
  loginAuthorization: ({ email, password }: ILoginBody) => Promise<any>;
  createUser: (user: IUserBody) => Promise<any>;
  loginUser: (secretKey: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = React.createContext<IContextValue>(null!);

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
    !response.errors && (await loadUser());
    return response;
  };

  const loginUser = async (secretKey: string) => {
    const response = await AuthService.loginUser(secretKey);
    !response.errors && (await loadUser());
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
