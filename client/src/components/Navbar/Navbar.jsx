import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hamburger from "../../assets/hamburger.svg";
import cross from "../../assets/cross.svg";
import bookmark from "../../assets/bookmark.svg";
import nbStyle from "./Navbar.module.css";
import dp from "../../assets/Mask-group.png";
import RegisterLoginForm from "../RegisterLoginForm/RegisterLoginForm";

const Button = ({ text, background, icon, onClick }) => (
  <div className={nbStyle.buttons} style={{ background }} onClick={onClick}>
    {icon && <img src={icon} alt="icon" />}
    {text}
  </div>
);

const HamburgerMenu = ({ isLoggedIn, username, onButtonClick, onLogout }) => (
  <>
    {isLoggedIn ? (
      <div className={nbStyle.hamburgerMenu}>
        <div className={nbStyle.credits}>
          <img src={dp} alt="User DP" />
          <h3>{username}</h3>
        </div>
        <Button text="Your Story" />
        <Button icon={bookmark} text="&nbsp; Bookmark" />
        <Button text="Add Story" />
        <Button text="Logout" onClick={onLogout}/>
      </div>
    ) : (
      <div className={nbStyle.hamburgerMenu} style={{ height: "15%" }}>
        <Button
          text="Register Now"
          background="#FF7373"
          onClick={() => onButtonClick("register")}
        />
        <Button
          text="Sign In"
          background="#73ABFF"
          onClick={() => onButtonClick("login")}
        />
      </div>
    )}
  </>
);

const LogoutMenu = ({ username, onLogout, onMouseLeave }) => (
  <div className={nbStyle.logoutMenu} onMouseLeave={onMouseLeave}>
    <h3 style={{ color: "black" }}>{username}</h3>
    <Button text="Logout" style={{ width: "8rem" }} onClick={onLogout} />
  </div>
);

export default function Navbar(prop) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = prop.isLoggedIn;
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState(null);
  const { username, setUsername, setId } = useContext(UserContext);
  username ? console.log("logged in") : console.log("not");
  const mouseLeave = () => {
    setTimeout(() => {
      setLogoutMenu(false);
    }, 1000);
  };

  const handleButtonClick = (action) => {
    setRegisterOrLogin(action);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    axios.post("/logout");
    setId(null);
    toaster();
    setUsername(null);
    setLogoutMenu(false);
    setIsMenuOpen(false);
  };

  function toaster() {
    toast.error(username + " logged out successfully", { position: toast.POSITION.TOP_CENTER, icon: ''});
  }

  return (
    <div className={nbStyle.navbar}>
      <strong className={nbStyle.logo}>SwipTory</strong>
      {isLoggedIn ? (
        <div className={nbStyle.logged}>
          <div className={nbStyle.btns}>
            <Button icon={bookmark} text="&nbsp;Bookmarks" />
            <Button text="Your Stories" />
          </div>
          <img src={dp} alt="dp" onClick={() => setLogoutMenu(!logoutMenu)} />
        </div>
      ) : (
        <div className={nbStyle.btns}>
          <Button
            text="Register Now"
            background="#FF7373"
            onClick={() => handleButtonClick("register")}
          />
          <Button
            text="Sign In"
            background="#73ABFF"
            onClick={() => handleButtonClick("login")}
          />
        </div>
      )}

      <div
        className={nbStyle.hamburger}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? (
          <img src={cross} alt="cross" />
        ) : (
          <img src={hamburger} alt="ham" />
        )}
      </div>

      {isMenuOpen && (
        <HamburgerMenu
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
          onButtonClick={handleButtonClick}
        />
      )}

      {logoutMenu && (
        <LogoutMenu
          username={username}
          onLogout={handleLogout}
          onMouseLeave={mouseLeave}
        />
      )}

      <RegisterLoginForm
        formType={registerOrLogin}
        open={() => setRegisterOrLogin(null)}
      />
    </div>
  );
}
