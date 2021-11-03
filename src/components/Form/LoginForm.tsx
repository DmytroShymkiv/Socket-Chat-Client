import { FC, useState } from "react";

import methods from "../../pages/SignPages/methods";
import Form from "./Form";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "../Alert/Alert";
import { ILoginUserBody } from "../../types/sign.types";
import { IError } from "../../types/error.type";

interface ILoginFormProps {
  onSubmit: (user: ILoginUserBody) => void;
}

const LoginForm: FC<ILoginFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string>("");
  const { loginAuthorization } = useAuth();

  const loginOnSubmit = async (user: ILoginUserBody) => {
    const { email, password } = user;
    const response = await loginAuthorization({ email, password });
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
      <Form onSubmit={loginOnSubmit} method={methods.IN} />
    </>
  );
};

export default LoginForm;
