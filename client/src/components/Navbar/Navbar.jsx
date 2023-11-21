import { useState } from "react";
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

const HamburgerMenu = ({ isLoggedIn, username, onButtonClick }) => (
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
        <Button text="Logout" />
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

const LogoutMenu = ({ username, onLogout }) => (
  <div className={nbStyle.logoutMenu}>
    <h3 style={{color: 'black'}}>{username}</h3>
    <Button text="Logout" style={{ width: "8rem" }} onClick={onLogout} />
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = !false;
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState(null);

  const handleButtonClick = (action) => {
    setRegisterOrLogin(action);
  };

  const handleLogout = () => {
    setLogoutMenu(false);
  };

  return (
    <div className={nbStyle.navbar}>
      <strong className={nbStyle.logo}>SwipTory</strong>

      {isLoggedIn ? (
        // Rendered when user is logged in
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
        {isMenuOpen ? <img src={cross} alt="cross" /> : <img src={hamburger} alt="ham"/>}
      </div>

      {isMenuOpen && (
        <HamburgerMenu
          isLoggedIn={isLoggedIn}
          username="username123"
          onButtonClick={handleButtonClick}
        />
      )}

      {logoutMenu && (
        <LogoutMenu username="username123" onLogout={handleLogout} />
      )}

      <RegisterLoginForm formType={registerOrLogin} open={()=>setRegisterOrLogin(null)}/>


    </div>
  );
}
