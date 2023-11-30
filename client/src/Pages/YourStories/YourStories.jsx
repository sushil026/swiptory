import React from "react";
import { Link } from "react-router-dom";
import myStoryStyle from "./YourStories.module.css";
import Story from "../../components/Story/Story";

export default function YourStories () {
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

  const storiesAvailable = !true;
  return (
    <div className={myStoryStyle.library}>
      <h1>Your Stories</h1>
      {!storiesAvailable ? (
        <div className={myStoryStyle.empty}>
          <h3>You have not added any stories yet!</h3>
          <Link to="/" className={myStoryStyle.links}>
            <div className={myStoryStyle.buttons}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className={myStoryStyle.stories}>
          <div className={myStoryStyle.storyWrapper}>
            {quotes.map((qt, index) => (
              <Story key={index} quoter={qt.quoter} quote={qt.quote} />
            ))}
          </div>
          <Link to="/" className={myStoryStyle.links}>
            <div className={myStoryStyle.buttons}>
              <p>Home</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
