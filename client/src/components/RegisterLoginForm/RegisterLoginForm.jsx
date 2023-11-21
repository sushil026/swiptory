import React, { useState } from "react";
import cut from "../../assets/cut.svg";
import formStyle from "./RegisterLoginForm.module.css";
import visible from "../../assets/visible.svg";
import invisible from "../../assets/not-visible.svg";

const RegisterLoginForm = ({ formType, open }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = () => {
    // Add your submit logic here using the username and password state values
    console.log("Username:", username);
    console.log("Password:", password);
    // Reset the form after submission if needed
    setUsername("");
    setPassword("");
  };

  if (formType === null) {
    return null;
  }
  return (
    <div className={formStyle.modal}>
      <div className={formStyle.modalOverlay} onClick={open}></div>
      <div className={formStyle.form}>
        {formType === "login" ? (
          <h1>Login to SwipTory</h1>
        ) : (
          <h1>Register to Swiptory</h1>
        )}
        <div className={formStyle.inputs}>
          <h3>Username</h3>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={formStyle.inputs}>
          <h3>Password</h3>
          <input
            type={isVisible ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div
            className={formStyle.visibility}
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <img src={visible} alt="eye" />
            ) : (
              <img src={invisible} alt="eye" />
            )}
          </div>
        </div>
        <div className={formStyle.buttons} onClick={handleSubmit}>
          {formType === "login" ? <p>Login</p> : <p>Register</p>}
        </div>
        <div className={formStyle.cut} onClick={open}>
          <img src={cut} alt="cut" />
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginForm;
