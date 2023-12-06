import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bmStyle from "./Bookmark.module.css";
import Story from "../../components/Story/Story";
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

const Bookmark = () => {
  const { id } = useContext(UserContext);
  const [noBookmarks, setNoBookmarks] = useState(true);
  const [bookmarkArray, setBookmarkArray] = useState([]);
  const [cover, setCover] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarkArray() {
      try {
        const response = await axios.get("/bookmarks", {
          params: { userId: id },
        });
        setNoBookmarks(response.data.bookmarks.length === 0);
        setBookmarkArray(response.data.bookmarks);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookmarkArray();
  }, [id]);

  useEffect(() => {
    async function fetchCovers() {
      const newCovers = [];
      for (const storyId of bookmarkArray) {
        try {
          const response = await axios.get(`/story/${storyId}`);
          newCovers.push(response.data.stories.slides[0]);
        } catch (error) {
          console.error(
            `Error fetching story with ID ${storyId}:`,
            error.message
          );
        }
      }
      setCover(newCovers);
    }
    if (bookmarkArray.length > 0) {
      fetchCovers();
    }
  }, [bookmarkArray]);

  return (
    <div className={bmStyle.bookmark}>
      <h1>Your Bookmarks</h1>
      {loading ? (
        <Loading />
      ) : noBookmarks ? (
        <div className={bmStyle.empty}>
          <h3>You have no bookmarks!</h3>
          <Link to="/" className={bmStyle.links}>
            <div className={bmStyle.buttons}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className={bmStyle.bmFeeds}>
          <div className={bmStyle.storyWrapper}>
            {cover.map((cover, index) => (
              <Story
                key={index}
                title={cover.title}
                description={cover.description}
                imageUrl={cover.imageUrl}
                storyId={bookmarkArray[index]}
              />
            ))}
          </div>
          <Link to="/" className={bmStyle.links}>
            <div className={bmStyle.buttons}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmark;
