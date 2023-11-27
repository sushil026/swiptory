import React, { useContext, useState } from "react";
import cut from "../../assets/cut.svg";
import formStyle from "./RegisterLoginForm.module.css";
import visible from "../../assets/visible.svg";
import invisible from "../../assets/not-visible.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";

const RegisterLoginForm = ({ formType, open }) => {
  const [username, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { setUsername, setId } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const url = formType === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setUsername(username);
    setId(data.id);
    setFormUsername("");
    setPassword("");
    toaster(formType);
    open();
  }
  function toaster(action) {
    action === "register"
      ? toast.error(username + " registered successfully", { position: toast.POSITION.TOP_CENTER, icon: ''})
      : toast.info(username + " signed in successfully", { position: toast.POSITION.TOP_CENTER, icon: '' });
  }

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
            onChange={(e) => setFormUsername(e.target.value)}
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
