import { FC } from "react";

import SignPage from "./SignPage";
import RegistrationForm from "../../components/Form/RegistrationForm";
import methods from "./methods";

const SignUpPage: FC = () => {
  return <SignPage Form={RegistrationForm} method={methods.UP} />;
};

export default SignUpPage;
