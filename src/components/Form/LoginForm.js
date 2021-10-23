import React, { useState } from "react";

import methods from "../../pages/SignPages/methods";
import Form from "./Form";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "../Alert/Alert";

export default function LoginForm({ onSubmit }) {
  const [error, setError] = useState("");
  const { loginAuthorization } = useAuth();

  const loginOnSubmit = async (user) => {
    const { email, password } = user;
    const response = await loginAuthorization({ email, password });
    if (response.errors) {
      setError(response.errors);
      return;
    }
    onSubmit(user);
  };

  return (
    <>
      <Alert message={error} />
      <Form onSubmit={loginOnSubmit} method={methods.IN} />
    </>
  );
}
