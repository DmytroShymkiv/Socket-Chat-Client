import React, { useContext, useState, useEffect } from "react";

import AuthService from "../services/AuthService";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const initial = {
    firstName: "a",
    lastName: "a",
    email: "dima.shymkiv@gmail.com",
  };
  const [currentUser, setCurrentUser] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // todo: load logged user
  }, []);

  const createUser = async (user) => {
    const response = await AuthService.createUser(user);
    !response.errors &&
      setCurrentUser({ firstName: user.firstName, lastName: user.lastName });
    return response;
  };

  const loginUser = (secretKey) => {
    return AuthService.loginUser(secretKey);
  };

  const checkEmail = (email) => {
    return AuthService.checkEmail(email);
  };

  const loginAuthorization = ({ email, password }) => {
    return AuthService.loginAuthorization({ email, password });
  };

  const value = {
    currentUser,
    checkEmail,
    loginAuthorization,
    createUser,
    loginUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
