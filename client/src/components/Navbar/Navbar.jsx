import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross from "../../assets/cross.svg";
import hamburger from "../../assets/hamburger.svg";
import bookmark from "../../assets/bookmark.svg";
import nbStyle from "./Navbar.module.css";
import RegisterLoginForm from "../RegisterLoginForm/RegisterLoginForm";
import AddStory from "../AddStory/AddStory";
import { UserContext } from "../../UserContext";

const Button = ({ text, background, icon, onClick }) => (
  <div className={nbStyle.buttons} style={{ background }} onClick={onClick}>
    {icon && <img src={icon} alt="icon" />}
    {text}
  </div>
);

const HamburgerMenu = ({ isLoggedIn, username, onButtonClick, onLogout, closeMenu, onAddStory}) => (
  <>
    {isLoggedIn ? (
      <div className={nbStyle.hamburgerMenu}>
        <div className={nbStyle.credits}>
          <img src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2f/2fd800e948d44ff71d9de275faef6a6a9cc3461c_full.jpg' alt="User DP" className={nbStyle.dp} />
          <h3>{username}</h3>
        </div>
        <Button text="Your Story" />
        <Link to="/bookmarks" className={nbStyle.links}>
          <Button icon={bookmark} text="&nbsp;Bookmarks" onClick={closeMenu} />
        </Link>
        <Button text="Add Story" onClick={onAddStory} />
        <Button text="Logout" onClick={onLogout} />
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState(null);
  const { username, setUsername, setId } = useContext(UserContext);
  const [isAddStoryFormOpen, setIsAddStoryFormOpen] = useState(false);
  const isLoggedIn = username ? true : false;
  const navigate = useNavigate();

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
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAddStory = () => {
    setIsAddStoryFormOpen(true);
    setIsMenuOpen(false);
  };

  function toaster() {
    toast.error(username + " logged out successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
      icon: "",
    });
  }

  return (
    <div className={nbStyle.navbar}>
      <strong className={nbStyle.logo}>SwipTory</strong>
      {isLoggedIn ? (
        <div className={nbStyle.logged}>
          <div className={nbStyle.btns}>
            <Link to="/bookmarks" className={nbStyle.links}>
              <Button icon={bookmark} text="&nbsp;Bookmarks" />
            </Link>
            <Button
              text="Add Story"
              onClick={() => setIsAddStoryFormOpen(true)}
            />
          </div>
          <img src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2f/2fd800e948d44ff71d9de275faef6a6a9cc3461c_full.jpg' alt="dp" className={nbStyle.dp} onClick={() => setLogoutMenu(!logoutMenu)} />
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
          closeMenu={closeMenu}
          onAddStory={handleAddStory}
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

      {isAddStoryFormOpen && (
        <AddStory open={() => setIsAddStoryFormOpen(false)} />
      )}
    </div>
  );
}
