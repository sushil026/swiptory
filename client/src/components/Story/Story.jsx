// Story.jsx
import React from "react";
import storyStyles from "./Story.module.css";

const Story = ({ quoter, quote }) => {
  return (
    <div className={storyStyles.story}>
      <div className={storyStyles.story_desc}>
        <h2>{quoter}</h2>
        <h5>{quote}</h5>
      </div>
    </div>
  );
};

export default Story;
