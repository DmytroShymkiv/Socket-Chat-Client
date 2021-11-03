import { FC } from "react";

import SignPage from "./SignPage";
import LoginForm from "../../components/Form/LoginForm";
import methods from "./methods";

const SignInPage: FC = () => {
  return <SignPage Form={LoginForm} method={methods.IN} />;
};

export default SignInPage;
