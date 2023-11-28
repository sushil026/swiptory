import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Pages/Home.jsx";
import Bookmark from "./components/Pages/Bookmark.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {

  return (
    <UserContextProvider>
      <ToastContainer />
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
