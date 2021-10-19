import React from "react";

import SignPage from "./SignPage";
import RegistrationForm from "../../components/Form/RegistrationForm";
import methods from "./methods";

export default function SignUpPage() {
  return <SignPage Form={RegistrationForm} method={methods.UP} />;
}
