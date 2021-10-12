import React from "react";
import SignPage from "./SignPage";
import LoginForm from "../../components/Form/LoginForm";
import methods from "./methods";

export default function SignInPage() {
  return <SignPage Form={LoginForm} method={methods.IN} />;
}
