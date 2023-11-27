import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import CatagoryPanel from "./components/CategoryPanel/CategoryPanel.jsx";
import Feeds from "./components/Feeds/Feeds.jsx";

export default function Routes() {
  const { username, id } = useContext(UserContext);


  return (
    <>
      <Navbar isLoggedIn = {Boolean(username)}/>
      <CatagoryPanel />
      <Feeds/>
      {/* <div>{username} {id}</div> */}
    </>
  );
}
