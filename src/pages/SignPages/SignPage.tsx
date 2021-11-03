import { useState, FC } from "react";
import { Link, useHistory } from "react-router-dom";

import ConfirmationForm from "../../components/Form/ConfirmationForm";
import LoginForm from "../../components/Form/LoginForm";
import RegistrationForm from "../../components/Form/RegistrationForm";
import { useAuth } from "../../contexts/AuthContext";
import ROUTES from "../../routes/routes";
import methods from "./methods";
import Alert from "../../components/Alert/Alert";
import { ICreateUserBody, ILoginUserBody } from "../../types/sign.types";
import { IError } from "../../types/error.type";

interface ISignInProps {
  Form: typeof LoginForm;
  method: methods.IN;
}

interface ISignUpProps {
  Form: typeof RegistrationForm;
  method: methods.UP;
}

type ISignPageProps = ISignInProps | ISignUpProps;

const SignPage: FC<ISignPageProps> = ({ Form, method }) => {
  const history = useHistory();

  enum stages {
    registration = "registration",
    confirmation = "confirmation",
  }
  type stageType = stages.registration | stages.confirmation;

  const [user, setUser] = useState<ICreateUserBody | ILoginUserBody | null>(
    null
  );
  const [stage, setStage] = useState<stageType>(stages.registration);
  const [error, setError] = useState<string>("");

  const { createUser, loginUser } = useAuth();

  const onConfirm = async (secretKey: string) => {
    const response =
      method === methods.UP
        ? await createUser({ ...(user as ICreateUserBody), secretKey })
        : await loginUser(secretKey);

    const { errors } = response as IError;
    if (errors) {
      setError(errors);

      const invalidSecretCodeMessage = "Invalid secret code";
      errors !== invalidSecretCodeMessage &&
        setStage(stages.registration);
    } else {
      history.push(ROUTES.CHAT_PAGE);
    }
  };

  const onSubmit = (user: ICreateUserBody | ILoginUserBody) => {
    user && setUser(user);
    setStage(stages.confirmation);
  };

  return (
    <div className="sign-page">
      {stage === stages.registration ? (
        <>
          <div className="sign-page__links">
            <Link
              style={{
                textDecoration: method === methods.IN ? "underline" : "none",
              }}
              to={ROUTES.SIGN_IN}
            >
              Sign In
            </Link>
            <div className="sign-page__links-divider">/</div>
            <Link
              style={{
                textDecoration: method === methods.UP ? "underline" : "none",
              }}
              to={ROUTES.SIGN_UP}
            >
              Sign Up
            </Link>
          </div>
          <Alert message={error} />
          <Form onSubmit={onSubmit} />
        </>
      ) : (
        <ConfirmationForm setSecret={onConfirm} error={error} />
      )}
    </div>
  );
};

export default SignPage;
