import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ConfirmationForm from "../../components/Form/ConfirmationForm";
import { useAuth } from "../../contexts/AuthContext";
import ROUTES from "../../routes/routes";
import methods from "./methods";
import Alert from "../../components/Alert/Alert";

export default function SignPage({ Form, method }) {
  const history = useHistory();

  const stages = {
    registration: "registration",
    confirmation: "confirmation",
  };

  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(stages.registration);
  const [error, setError] = useState("");

  const { createUser, loginUser } = useAuth();

  const onConfirm = async (secretKey) => {
    const response =
      method === methods.UP
        ? await createUser({ ...user, secretKey })
        : await loginUser({ secretKey });

    if (response.errors) {
      setError(response.errors);

      const invalidSecretCodeMessage = "Invalid secret code";
      response.errors !== invalidSecretCodeMessage &&
        setStage(stages.registration);
    } else {
      history.push(ROUTES.CHAT_PAGE);
    }
  };

  const onSubmit = (user) => {
    user && setUser(user);
    setStage(stages.confirmation);
  };

  return (
    <div className="sign-page">
      {stage === stages.registration ? (
        <>
          <div className="sign-page__links">
            <Link
              style={{ textDecoration: method === methods.IN && "underline" }}
              to={ROUTES.SIGN_IN}
            >
              Sign In
            </Link>
            <div className="sign-page__links-divider">/</div>
            <Link
              style={{ textDecoration: method === methods.UP && "underline" }}
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
}
