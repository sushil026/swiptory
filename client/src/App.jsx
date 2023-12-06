import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Bookmark from "./Pages/Bookmarks/Bookmark.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import YourStories from "./Pages/YourStories/YourStories.jsx";
import { StoryProvider } from "./StoryContext";
import ViewStory from "./Pages/viewStory/ViewStory.jsx";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <StoryProvider>
        <ToastContainer />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/bookmarks" element={<Bookmark/>} />
            <Route path="/my-stories" element={<YourStories/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/story/:storyId" Component={ViewStory} />
          </Routes>
        </Router>
      </StoryProvider>
    </UserContextProvider>
  );
}
