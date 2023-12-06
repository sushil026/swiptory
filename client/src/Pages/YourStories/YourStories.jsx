import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import myStoryStyle from "./YourStories.module.css";
import Story from "../../components/Story/Story";
import AddStory from "../../components/AddStory/AddStory";
import { UserContext } from "../../UserContext";
import ReactLoading from "react-loading";

const Loading = () => (
    <ReactLoading
      type={"bubbles"}
      color={"#ff7373"}
      height={"7%"}
      width={"7%"}
    />
);

const YourStories = () => {
  const [yourStories, setYourStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useContext(UserContext);
  const [showAddStory, setShowAddStory] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 780);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 780);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchYourStories = async () => {
      try {
        const myStoriesResponse = await axios.get("/my-stories/" + id);
        setYourStories(myStoriesResponse.data.stories);
      } catch (error) {
        console.error("Error fetching your stories:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchYourStories();
  }, [id]);

  const [storyId, setStoryId] = useState(null); 
  const handleEditClick = ( storyId) => {
    setStoryId(storyId);
    setShowAddStory(true);
  };

  return (
    <div className={myStoryStyle.library}>
      {yourStories.length ? <h1>Your Stories</h1> : null}
      {loading ? (
        <Loading />
      ) : !yourStories.length ? (
        isLargeScreen ? null : (
          <div className={myStoryStyle.empty}>
            <h3>You have not added any stories yet!</h3>
            <Link to="/" className={myStoryStyle.links}>
              <div className={myStoryStyle.buttons}>
                <p>Home</p>
              </div>
            </Link>
          </div>
        )
      ) : (
        <div className={myStoryStyle.stories}>
          <div className={myStoryStyle.storyWrapper}>
            {yourStories.map((story, index) => (
              
              <div key={index} className={myStoryStyle.container}>
                <Story
                  title={story.slides[0].title}
                  description={story.slides[0].description}
                  imageUrl={story.slides[0].imageUrl}
                  storyId={story._id}
                />
                <button
                  className={myStoryStyle.editButton}
                  onClick={() => handleEditClick(story._id)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          <Link to="/" className={myStoryStyle.links}>
            <div className={myStoryStyle.buttons}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      )}
      {showAddStory && (
        <AddStory
          open={() => setShowAddStory(false)}
          type={'update'}
          storyId= {storyId}
        />
      )}
    </div>
  );
};

export default YourStories;
