import { useState, useContext, useEffect } from "react";
import feedStyles from "./Feeds.module.css";
import Story from "../Story/Story";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";
import YourStories from "../../Pages/YourStories/YourStories";
import axios from "axios";

const categories = [
  { title: "Food", api: "food" },
  { title: "Health & Fitness", api: "hnf" },
  { title: "Travel", api: "travel" },
  { title: "Movies", api: "movies" },
  { title: "Education", api: "education" },
];

export default function Feeds() {
  const [showAllStories, setShowAllStories] = useState({});
  const { id, selectedCategory } = useContext(UserContext);
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

  const [categoryStories, setCategoryStories] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempCategoryStories = {};
        var yrStories = null;
        if (id) {
          const myStoriesResponse = await axios.get("/my-stories/" + id);
          yrStories = myStoriesResponse.data.stories;
        }
        for (const category of categories) {
          const response = await axios.get(`/${category.api}-stories`);
          if (response.data.stories.length > 0) {
            response.data.stories.forEach((story) => {
              const objTemp = {
                albumId: story._id,
                slides: story.slides,
                creatorId: story.creatorId,
              };
              if (!id) {
                tempCategoryStories[category.title] = [
                  ...(tempCategoryStories[category.title] || []),
                  objTemp,
                ];
              } else {
                if (story.creatorId !== id) {
                  tempCategoryStories[category.title] = [
                    ...(tempCategoryStories[category.title] || []),
                    objTemp,
                  ];
                }
              }
            });
          }
        }
        setCategoryStories(tempCategoryStories);
      } catch (error) {
        console.error("Error fetching stories:", error.message);
      }
    };
    fetchData();
  }, [id, categories]);

  const handleSeeMore = (category) => {
    setShowAllStories((prevShowAll) => ({
      ...prevShowAll,
      [category]: !prevShowAll[category],
    }));
  };

  return (
    <div className={feedStyles.feeds}>
      {isLargeScreen && id && selectedCategory === "All" && <YourStories />}
      {selectedCategory === "All" ? (
        categories.map((c) => (
          <div key={c.title} className={feedStyles.feedPanel}>
            <h2>Top stories about {c.title}</h2>
            {categoryStories[c.title] && categoryStories[c.title].length > 0 ? (
              <>
                <div className={feedStyles.story_wrapper} 
                style={{ justifyContent: categoryStories[c.title].length < 5 ? 'center' : ''  }}
                >
                  {showAllStories[c.title]
                    ? categoryStories[c.title].map((story, index) => (
                        <Story
                          key={index}
                          title={story.slides[0]?.title}
                          description={story.slides[0]?.description}
                          imageUrl={story.slides[0]?.imageUrl}
                          storyId={story.albumId}
                        />
                      ))
                    : categoryStories[c.title]
                        .slice(0, 5)
                        .map((story, index) => (
                          <Story
                            key={index}
                            title={story.slides[0]?.title}
                            description={story.slides[0]?.description}
                            imageUrl={story.slides[0]?.imageUrl}
                            storyId={story.albumId}
                          />
                        ))}
                </div>
                {categoryStories[c.title].length > 5 && (
                  <div
                    className={feedStyles.buttons}
                    onClick={() => handleSeeMore(c.title)}
                  >
                    {showAllStories[c.title] ? "Show less" : "See more"}
                  </div>
                )}
              </>
            ) : (
              <div className={feedStyles.noStories}>No stories available</div>
            )}
          </div>
        ))
      ) : (
        <div className={feedStyles.feedPanel}>
          <h2>Top stories about {selectedCategory}</h2>
          {categoryStories[selectedCategory] &&
          categoryStories[selectedCategory].length > 0 ? (
            <div className={feedStyles.story_wrapper}>
              {categoryStories[selectedCategory].map((story, index) => (
                <Story
                  key={index}
                  title={story.slides[0]?.title}
                  description={story.slides[0]?.description}
                  imageUrl={story.slides[0]?.imageUrl}
                  storyId={story.albumId}
                />
              ))}
            </div>
          ) : (
            <div className={feedStyles.noStories}>No stories available</div>
          )}
        </div>
      )}
    </div>
  );
}
