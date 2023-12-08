import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import viewStyle from "./ViewStory.module.css";
import liked from "../../assets/liked.svg";
import not_liked from "../../assets/not-liked.svg";
import not_bookmarked from "../../assets/not-bookmarked.svg";
import bookmarked from "../../assets/bookmarked.svg";
import cross from "../../assets/cross2.svg";
import send from "../../assets/send.svg";
import next from "../../assets/nextSlide.svg";
import previous from "../../assets/prevSlide.svg";
import { StoryContext } from "../../StoryContext";
import { UserContext } from "../../UserContext";
import RegisterLoginForm from "../../components/RegisterLoginForm/RegisterLoginForm";
import { useParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loading = () => (
  <ReactLoading
    type={"bubbles"}
    color={"#ff7373"}
    height={"7%"}
    width={"7%"}
  />
);

const ViewStory = () => {
  const { storyId } = useParams();
  const { id } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { clicked, currentStorySlides, creatorId } = useContext(StoryContext);
  const [isLiked, setLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const slideId = currentStorySlides?.[currentIndex]?._id;
  const [registerOrLogin, setRegisterOrLogin] = useState(null);
  const sameUser = creatorId === id;
  const nav = useNavigate();
  const totalSlides = currentStorySlides?.length || 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clicked(storyId);
  }, [storyId, clicked]);

  useEffect(() => {
    slideRendered(null);
    if (id) {
      axios
        .get("/bookmarks", {
          params: { userId: id },
        })
        .then((response) => {
          if (response.data && response.data.bookmarks) {
            setIsBookmarked(response.data.bookmarks.includes(storyId));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const storyTimer = setTimeout(() => {
      setCurrentIndex((ind) => (ind === totalSlides - 1 ? 0 : ind + 1));
    }, 5000);

    setLoading(false);

    return () => {
      if (storyTimer) {
        clearTimeout(storyTimer);
      }
    };
  }, [currentIndex, id, slideRendered, storyId, totalSlides]);

  function closingStory() {
    nav(-1);
    clicked(null);
  }

  function slideRendered(action) {
    if (action) {
      setLiked(action.liked);
      setLikesOnCurrentSlide(
        action.liked ? likesOnCurrentSlide + 1 : likesOnCurrentSlide - 1
      );
    } else {
      axios
        .get("/slide", {
          params: { slideId: slideId, currentStory: storyId },
        })
        .then((response) => {
          if (response.data && response.data.targetSlide) {
            setLiked(response.data.targetSlide.likes.includes(id));
            setLikesOnCurrentSlide(response.data.targetSlide.likes.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const [likesOnCurrentSlide, setLikesOnCurrentSlide] = useState(
    currentStorySlides?.[0]?.likes?.length
  );

  function interact(action) {
    switch (action) {
      case "like":
        if (currentStorySlides && currentStorySlides[currentIndex]) {
          if (!id) {
            setRegisterOrLogin("login");
            return;
          }
          axios
            .post(`/update/like`, null, {
              params: { slideId: slideId, id: id, currentStory: storyId },
            })
            .then((response) => {
              slideRendered(response.data);
            })
            .catch((error) => console.error("Error liking story:", error));
        }
        break;
      case "bookmark":
        if (!id) {
          setRegisterOrLogin("login");
          return;
        }
        if (storyId) {
          axios
            .post(`/update/bookmark`, null, {
              params: { id: id, currentStory: storyId },
            })
            .then((response) => {
              setIsBookmarked(response.data.bookmarked);
            })
            .catch((error) => console.error("Error bookmarking story:", error));
        }
        break;
      case "send":
        (async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard',{position: 'top-center', icon: ''})
          } catch (err) {
            console.error("Unable to copy to clipboard:", err);
          }
        })();
        break;
      case "next":
        if (
          currentStorySlides &&
          currentIndex < currentStorySlides.length - 1
        ) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        break;
      case "previous":
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        break;
      default:
        console.log("Unknown action");
    }
  }

  const Slide = ({ title, description, imageUrl, likes, isLiked }) => {
    return (
      <div
        className={viewStyle.form}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={viewStyle.likes} onClick={() => interact("like")}>
          {!isLiked ? (
            <img
              src={not_liked}
              alt="Not Liked"
              className={viewStyle.buttonImages}
            />
          ) : (
            <img src={liked} alt="Liked" className={viewStyle.buttonImages} />
          )}
          {likes === 0 ? null : <p>{likes}</p>}
        </div>
        {!sameUser && (
          <div
            className={viewStyle.bookmarks}
            onClick={() => interact("bookmark")}
          >
            {!isBookmarked ? (
              <img
                src={not_bookmarked}
                alt="Not Bookmarked"
                className={viewStyle.buttonImages}
              />
            ) : (
              <img
                src={bookmarked}
                alt="Bookmarked"
                className={viewStyle.buttonImages}
              />
            )}
          </div>
        )}
        <div className={viewStyle.cross} onClick={closingStory}>
          <img src={cross} alt="Cross" className={viewStyle.buttonImages} />
        </div>
        <div className={viewStyle.send} onClick={() => interact("send")}>
          <img src={send} alt="Send" className={viewStyle.buttonImages} />
        </div>
        {currentIndex < currentStorySlides?.length - 1 && (
          <div className={viewStyle.nextBtn} onClick={() => interact("next")}>
            <img src={next} alt="Next Slide" />
          </div>
        )}
        {currentIndex > 0 && (
          <div
            className={viewStyle.prevBtn}
            onClick={() => interact("previous")}
          >
            <img src={previous} alt="Previous Slide" />
          </div>
        )}
        <div className={viewStyle.caption}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  const Progress = ({ totalSlides, current }) => {
    const progressBarItems = Array.from({ length: totalSlides }, (_, index) => {
      let className = viewStyle.progressBarItem;
      if (current === index) {
        className += ` ${viewStyle.active}`;
      } else if (current < index) {
        className += ` ${viewStyle.pending}`;
      } else {
        className += ` ${viewStyle.complete}`;
      }
      return <div key={index} className={className}></div>;
    });
    return <div className={viewStyle.progress}>{progressBarItems}</div>;
  };

  return (
    <div className={viewStyle.modal}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className={viewStyle.modalOverlay}
            onClick={closingStory}
          ></div>
          <Progress
            totalSlides={currentStorySlides?.length}
            current={currentIndex}
          />
          {currentStorySlides && (
            <Slide
              title={currentStorySlides[currentIndex]?.title}
              description={currentStorySlides[currentIndex]?.description}
              imageUrl={currentStorySlides[currentIndex]?.imageUrl}
              likes={likesOnCurrentSlide}
              isLiked={isLiked}
            />
          )}
          <RegisterLoginForm
            formType={registerOrLogin}
            open={() => setRegisterOrLogin(null)}
          />
        </>
      )}
    </div>
  );
};

export default ViewStory;
