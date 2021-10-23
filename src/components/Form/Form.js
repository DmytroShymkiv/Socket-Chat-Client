import React, { useState } from "react";

import methods from "../../pages/SignPages/methods";
import Loader from "../Loader/Loader";

export default function Form({ onSubmit, method, children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(user);
    setLoading(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function Input(name, placeholder, type) {
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
      {method === methods.UP && Input("firstName", "First Name")}
      {method === methods.UP && Input("lastName", "Last Name")}
      {Input("email", "E-Mail")}
      {Input("password", "Password", "password")}
      <button disabled={loading} className="sign-form__submit" type="submit">
        {loading ? <Loader /> : method}
      </button>
    </form>
  );
}
