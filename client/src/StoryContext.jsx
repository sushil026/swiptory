import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const StoryContext = createContext({});

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [currentStorySlides, setCurrentStorySlides] = useState(null);
  useEffect(() => {
    async function fetchStoryById() {
      if( storyId ){
        const response = await axios.get(`/story/`+storyId);
        setStories(response.data.stories);
        setCreatorId(response.data.stories.creatorId)
        setCurrentStorySlides(response.data.stories.slides)
      }
    }
    fetchStoryById();
  }, [storyId]);

  function clicked(id) {
    setStoryId(id);
  }
  return (
    <StoryContext.Provider
      value={{ stories, clicked, currentStorySlides, storyId, creatorId}}
    >
      {children}
    </StoryContext.Provider>
  );
};
