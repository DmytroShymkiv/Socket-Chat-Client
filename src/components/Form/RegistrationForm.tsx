import { FC, useState } from "react";

import methods from "../../pages/SignPages/methods";
import Form from "./Form";
import Alert from "../Alert/Alert";
import { useAuth } from "../../contexts/AuthContext";
import { ICreateUserBody } from "../../types/sign.types";
import { IError } from "../../types/error.type";

interface IRegistrationFormProps {
  onSubmit: (user: ICreateUserBody) => void;
}

const RegistrationForm: FC<IRegistrationFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string>("");
  const { checkEmail } = useAuth();

  const registrationOnSubmit = async (user: ICreateUserBody) => {
    const response = await checkEmail(user.email);
    const { errors } = response as IError;
    if (errors) {
      setError(errors);
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
};

export default RegistrationForm;
