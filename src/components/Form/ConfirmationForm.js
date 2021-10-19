import React, { useState } from "react";

import Alert from "../Alert/Alert";

export default function ConfirmationForm({ setSecret, error }) {
  const array = new Array(6).fill("");
  const [keys, setKeys] = useState(array);

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
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
            name={index}
            value={keys[index]}
            onChange={handleChange}
            placeholder="0"
          />
        ))}
        <input type="submit" style={{ display: "none" }} />
      </form>
    </>
  );
}
