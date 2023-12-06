import React from "react";
import storyStyles from "./Story.module.css";
import { useNavigate } from "react-router-dom";

const Story = ({ title, description, imageUrl, storyId }) => {
  const nav = useNavigate();
  return (
      <div
        className={storyStyles.story}
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={()=>nav('/story/'+storyId)}
      >
        <div className={storyStyles.story_desc}>
          <h2>{title}</h2>
          <h5>{description}</h5>
        </div>
      </div>
  );
};

export default Story;
