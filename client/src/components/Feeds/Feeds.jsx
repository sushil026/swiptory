import { useState } from "react";
import feedStyles from "./Feeds.module.css";
import Story from "../Story/Story";
import "react-toastify/dist/ReactToastify.css";
const categories = [
  { title: "Food" },
  { title: "Health & Fitness" },
  { title: "Travel" },
  { title: "Movies" },
  { title: "Education" },
];

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
  {
    quoter: "Walt Disney",
    quote: "The way to get started is to quit talking and begin doing.",
  },
  {
    quoter: "Oprah Winfrey",
    quote:
      "The biggest adventure you can take is to live the life of your dreams.",
  },
  {
    quoter: "Mark Twain",
    quote: "The secret of getting ahead is getting started.",
  },
  {
    quoter: "Helen Keller",
    quote: "Life is either a daring adventure or nothing at all.",
  },
  {
    quoter: "Steve Jobs",
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
  },
  {
    quoter: "Eleanor Roosevelt",
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
  },
  { quoter: "Dr. Seuss", quote: "Why fit in when you were born to stand out?" },
];

export default function Feeds() {
  const [showAllStories, setShowAllStories] = useState({});

  const handleSeeMore = (category) => {
    setShowAllStories((prevShowAll) => ({
      ...prevShowAll,
      [category]: !prevShowAll[category],
    }));
  };

  return (
    <div className={feedStyles.feeds}>
      {categories.map((c) => (
        <div key={c.title} className={feedStyles.feedPanel}>
          <h2>Top stories about {c.title}</h2>
          <div className={feedStyles.story_wrapper}>
            {showAllStories[c.title]
              ? quotes.map((qt, index) => (
                  <Story key={index} quoter={qt.quoter} quote={qt.quote} />
                ))
              : quotes
                  .slice(0, 2)
                  .map((qt, index) => (
                    <Story key={index} quoter={qt.quoter} quote={qt.quote} />
                  ))}
          </div>
          <div
            className={feedStyles.buttons}
            onClick={() => handleSeeMore(c.title)}
          >
            {showAllStories[c.title] ? "Show less" : "See more"}
          </div>
        </div>
      ))}
    </div>
  );
}
