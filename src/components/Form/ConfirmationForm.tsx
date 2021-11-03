import { ChangeEvent, FC, FormEvent, useState } from "react";

import Alert from "../Alert/Alert";

interface IConfirmationProps {
  setSecret: (secretKey: string) => Promise<void>;
  error: string;
}

const ConfirmationForm: FC<IConfirmationProps> = ({ setSecret, error }) => {
  const array = new Array(6).fill("");
  const [keys, setKeys] = useState<string[]>(array);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    if ((value.length !== 1 || Number.isNaN(Number(value))) && value !== "")
      return;

    setKeys((prev) => {
      const newKeys = [...prev];
      newKeys[Number(name)] = value;
      return newKeys;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await setSecret(keys.join(""));
  };

  return (
    <>
      <h1 className="authentication-title">Authentication</h1>
      <Alert message={error} />
      <form className="authentication-form" onSubmit={handleSubmit}>
        {array.map((_, index) => (
          <input
            className="authentication-form__input"
            key={index}
            name={index.toString()}
            value={keys[index]}
            onChange={handleChange}
            placeholder="0"
          />
        ))}
        <input type="submit" style={{ display: "none" }} />
      </form>
    </>
  );
};

export default ConfirmationForm;
