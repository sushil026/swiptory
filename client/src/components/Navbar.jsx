import { useState } from "react";
import hamburger from "../assets/hamburger.svg";
import cross from "../assets/cross.svg";
import bookmark from "../assets/bookmark.svg";
import nbStyle from "./Navbar.module.css";

import dp from "../assets/Mask-group.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);
  return (
    <div className={nbStyle.navbar}>
      <strong className={nbStyle.logo}>SwipTory</strong>
      {isLoggedIn ? (
        <div className={nbStyle.logged}>
          <div className={nbStyle.btns}>
            <div className={nbStyle.buttons}>
              <img src={bookmark} />
              Bookmarks
            </div>
            <div className={nbStyle.buttons}>Your Stories</div>
          </div>
          <img src={dp} onClick={() => setLogoutMenu(!logoutMenu)} />
        </div>
      ) : (
        <div className={nbStyle.btns}>
          <div className={nbStyle.buttons} style={{ background: "#FF7373" }}>
            Register Now
          </div>
          <div className={nbStyle.buttons} style={{ background: "#73ABFF" }}>
            Sign In
          </div>
        </div>
      )}

      <div
        className={nbStyle.hamburger}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <img src={cross} /> : <img src={hamburger} />}
      </div>
      {isMenuOpen &&
        (isLoggedIn ? (
          <div className={nbStyle.hamburgerMenu}>
            <div className={nbStyle.credits}>
              <img src={dp} />
              <h3>username123</h3>
            </div>
            <div className={nbStyle.buttons}>Your Story</div>
            <div className={nbStyle.buttons}>
              <img src={bookmark} />
              Bookmarks
            </div>
            <div className={nbStyle.buttons}>Add Story</div>
            <div className={nbStyle.buttons}>logout</div>
          </div>
        ) : (
          <div className={nbStyle.hamburgerMenu} style={{ height: "20%" }}>
            <div className={nbStyle.buttons}>Register Now</div>
            <div className={nbStyle.buttons}>Sign In</div>
          </div>
        ))}
      {logoutMenu && (
        <div className={nbStyle.logoutMenu}>
          <h3>username123</h3>
          <div className={nbStyle.buttons} style={{ width: "8rem" }}>
            logout
          </div>
        </div>
      )}
    </div>
  );
}
