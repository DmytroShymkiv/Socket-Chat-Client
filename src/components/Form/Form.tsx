import { useState, FC, ChangeEvent, FormEvent } from "react";

import methods from "../../pages/SignPages/methods";
import {
  ICreateUserBody,
  ILoginUserBody,
} from "../../types/sign.types";
import Loader from "../Loader/Loader";

interface IFormLogin {
  onSubmit: (user: ICreateUserBody) => Promise<void>;
  method: methods.UP;
}

interface IFormCreate {
  onSubmit: (user: ILoginUserBody) => Promise<void>;
  method: methods.IN;
}

type IFormProps = IFormLogin | IFormCreate;

const Form: FC<IFormProps> = ({ onSubmit, method }) => {
  const isSignUp = method === methods.UP;

  const [user, setUser] = useState({
    ...(isSignUp && { firstName: "", lastName: "" }),
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(user as ICreateUserBody);
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  enum InputNames {
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    password = "password",
  }
  type InputNamesType =
    | InputNames.firstName
    | InputNames.lastName
    | InputNames.email
    | InputNames.password;

  function Input(name: InputNamesType, placeholder: string, type?: string) {
    return (
      <input
        className="sign-form__input"
        value={user?.[name]}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        type={type || "text"}
      />
    );
  }

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      {isSignUp && (
        <>
          {Input(InputNames.firstName, "First Name")}
          {Input(InputNames.lastName, "Last Name")}
        </>
      )}
      {Input(InputNames.email, "E-Mail")}
      {Input(InputNames.password, "Password", "password")}
      <button disabled={loading} className="sign-form__submit" type="submit">
        {loading ? <Loader /> : method}
      </button>
    </form>
  );
};

export default Form;
