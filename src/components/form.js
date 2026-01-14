"use client";

import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("state kosong");
  const [email, setEmail] = useState("email@boongan.com");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit test", name, email);
    setName("");
    setEmail("");
  };

  console.log("form component");
  return (
    <div>
      <h1>form</h1>
      <form>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p>email</p>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button onClick={handleSubmit}>submit button</button>
      </form>
    </div>
  );
};

export default Form;
