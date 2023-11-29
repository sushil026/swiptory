import React from "react";
import { Link } from "react-router-dom";
import bmStyle from "./Bookmark.module.css";
import Story from "../components/Story/Story";

const Bookmark = () => {
  const quotes = [
    {
      quoter: "Albert Einstein",
      quote:
        "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    },
    {
      quoter: "Maya Angelou",
      quote: "We may encounter many defeats but we must not be defeated.",
    },
    // {
    //   quoter: "Walt Disney",
    //   quote: "The way to get started is to quit talking and begin doing.",
    // },
    // {
    //   quoter: "Oprah Winfrey",
    //   quote:
    //     "The biggest adventure you can take is to live the life of your dreams.",
    // },
    // {
    //   quoter: "Mark Twain",
    //   quote: "The secret of getting ahead is getting started.",
    // },
    // {
    //   quoter: "Helen Keller",
    //   quote: "Life is either a daring adventure or nothing at all.",
    // },
    // {
    //   quoter: "Steve Jobs",
    //   quote:
    //     "Your time is limited, so don't waste it living someone else's life.",
    // },
    // {
    //   quoter: "Eleanor Roosevelt",
    //   quote:
    //     "The future belongs to those who believe in the beauty of their dreams.",
    // },
    // {
    //   quoter: "Dr. Seuss",
    //   quote: "Why fit in when you were born to stand out?",
    // },
  ];

  const bookmarks = !true;
  return (
    <div className={bmStyle.bookmark}>
      <h1>Your Bookmarks</h1>
      {bookmarks ? (
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
            {quotes.map((qt, index) => (
              <Story key={index} quoter={qt.quoter} quote={qt.quote} />
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
