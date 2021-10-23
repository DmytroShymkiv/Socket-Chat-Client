import React, { useState } from "react";

import methods from "../../pages/SignPages/methods";
import Form from "./Form";
import Alert from "../Alert/Alert";
import { useAuth } from "../../contexts/AuthContext";

export default function RegistrationForm({ onSubmit }) {
  const [error, setError] = useState("");
  const { checkEmail } = useAuth();

  const registrationOnSubmit = async (user) => {
    const response = await checkEmail(user.email);
    if (response.errors) {
      setError(response.errors);
      return;
    }
    onSubmit(user);
  };
  
  return (
    <>
      <Alert message={error} />
      <Form onSubmit={registrationOnSubmit} method={methods.UP} />
    </>
  );
}
