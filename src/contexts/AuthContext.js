import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    setLoading(false); // todo: load logged user
  }, []);

  const handleError = async (callback) => {
    try {
      return await callback();
    } catch (error) {
      let errors = error.response.data;
      if (errors.join) errors = errors.join("\n");
      else if (errors.message) errors = errors.message;
      return { errors };
    }
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const postUser = async (url, body) => {
    return handleError(async () => {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: getToken(),
        },
      });
      setToken(response.data.token);
      return true;
    });
  };

  const createUser = async (user) => {
    const url = `${BASE_URL}/register/secret`;
    const response = await postUser(url, user);
    !response.errors &&
      setCurrentUser({ firstName: user.firstName, lastName: user.lastName });
    return response;
  };

  const loginUser = async (secretKey) => {
    const url = `${BASE_URL}/login/secret`;
    return await postUser(url, secretKey);
  };

  const checkEmail = async (email) => {
    const url = `${BASE_URL}/register`;
    return await handleError(async () => {
      const response = await axios.post(url, { email });
      setToken(response.data.token);
      return true;
    });
  };

  const loginAuthorization = async ({ email, password }) => {
    const url = `${BASE_URL}/login`;
    return await handleError(async () => {
      const response = await axios.post(url, { email, password });
      setToken(response.data.token);
      return true;
    });
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
