import React, { useState, useContext, useEffect } from "react";
import storyFormStyle from "./AddStory.module.css";
import cut from "../../assets/cut.svg";
import add from "../../assets/add.svg";
import minus from "../../assets/minus.svg";
import post from "../../assets/post.svg";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import save from "../../assets/save.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../UserContext";
import ReactLoading from "react-loading";
import { StoryContext } from "../../StoryContext";

const Loading = () => (
  <ReactLoading type={"spokes"} color={"#ff7373"} height={"4%"} width={"4%"} />
);

const AddStory = ({ open, type, storyId }) => {
  const { id } = useContext(UserContext);
  const [album, setAlbum] = useState({
    stories: [
      { imageUrl: "", title: "", description: "", category: "" },
      { imageUrl: "", title: "", description: "", category: "" },
      { imageUrl: "", title: "", description: "", category: "" },
    ],
  });

  const [slideInFocus, setSlideInFocus] = useState(0);
  const [numSlidesAvailable, setNumSlidesAvailable] = useState(3);
  const [numSlidesFilled, setNumSlidesFilled] = useState([]);

  const [errors, setErrors] = useState([
    { imageUrl: false, title: false, description: false, category: false },
    { imageUrl: false, title: false, description: false, category: false },
    { imageUrl: false, title: false, description: false, category: false },
  ]);

  const [isSlideEmpty, setIsSlideEmpty] = useState(false);

  const categories = [
    "Food",
    "Health & Fitness",
    "Travel",
    "Movies",
    "Education",
  ];

  const validateTitle = (title) => title.length <= 50;
  const validateDescription = (description) => {
    const words = description.split(/\s+/);
    return words.length <= 30;
  };

  const [isImageUrlValid, setIsImageUrlValid] = useState(true);

  const handleChange = (e, field) => {
    const newAlbum = { ...album };
    const newErrors = [...errors];
    const value = e.target.value;
    newAlbum.stories[slideInFocus][field] = value;
    newErrors[slideInFocus][field] = !validateField(value, field);
    if (field === "imageUrl") {
      setIsImageUrlValid(true);
    }
    setAlbum(newAlbum);
    setErrors(newErrors);
  };

  const validateField = (value, field) => {
    switch (field) {
      case "title":
        return validateTitle(value);
      case "description":
        return validateDescription(value);
      default:
        return true;
    }
  };

  const handleBlur = async (field) => {
    performValidation(slideInFocus, field);
    if (field === "imageUrl") {
      const isImageValid = await checkImageExists();
      setIsImageUrlValid(isImageValid);
    }
  };

  const checkImageExists = async () => {
    const newErrors = [...errors];
    newErrors[slideInFocus].imageUrl = false;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });
    };

    try {
      const imageExists = await loadImage(album.stories[slideInFocus].imageUrl);
      return imageExists;
    } catch (error) {
      return false;
    }
  };

  const performValidation = async (index, field) => {
    const newErrors = [...errors];
    const slide = album.stories[index];
    switch (field) {
      case "category":
        newErrors[index].category = !slide.category;
        break;
      case "imageUrl":
        const isImageValid = await checkImageExists();
        newErrors[index].imageUrl = !isImageValid;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleAddSlide = () => {
    if (numSlidesAvailable < 6) {
      setAlbum({
        ...album,
        stories: [
          ...album.stories,
          {
            imageUrl: "",
            title: "",
            description: "",
            category: album.stories[0].category,
          },
        ],
      });
      setErrors([
        ...errors,
        { imageUrl: false, title: false, description: false, category: false },
      ]);
      setNumSlidesAvailable((prevNumSlides) => prevNumSlides + 1);
    }
  };

  const handleRemoveSlide = () => {
    const removedIndex = numSlidesAvailable - 1;
    const newAlbum = { ...album };
    const newErrors = [...errors];
    newAlbum.stories.pop();
    newErrors.pop();

    setAlbum(newAlbum);
    setErrors(newErrors);
    setNumSlidesAvailable((prevNumSlides) => prevNumSlides - 1);

    const isSlideInNumSlidesFilled = numSlidesFilled?.includes(removedIndex);

    setNumSlidesFilled((prevFilledSlides) =>
      isSlideInNumSlidesFilled
        ? prevFilledSlides.filter((index) => index !== removedIndex)
        : prevFilledSlides
    );
    if (slideInFocus >= numSlidesAvailable - 1) {
      setSlideInFocus(numSlidesAvailable - 2);
    }
  };

  const handlePreviousSlide = () => {
    if (slideInFocus > 0) {
      setSlideInFocus((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (slideInFocus < numSlidesAvailable - 1) {
      setSlideInFocus((prevIndex) => prevIndex + 1);
    }
  };

  const savingToAlbum = (index) => {
    const newAlbum = { ...album };
    newAlbum.stories[index] = { ...album.stories[index] };
    toaster("Slide saved successfully", "success");
    setAlbum(newAlbum);
  };

  const saveToAlbum = (e) => {
    e.preventDefault();
    if (
      album.stories[slideInFocus].title &&
      album.stories[slideInFocus].description &&
      album.stories[slideInFocus].category &&
      isImageUrlValid
    ) {
      setIsSlideEmpty(false);
      const isNoErrors =
        Object.values(errors[slideInFocus]).every((error) => error === false) &&
        isImageUrlValid;
      if (isNoErrors) {
        const newAlbum = { ...album };
        newAlbum.stories[slideInFocus] = { ...album.stories[slideInFocus] };
        setAlbum(newAlbum);
        if (!numSlidesFilled.includes(slideInFocus)) {
          setNumSlidesFilled((prevFilledSlides) => [
            ...prevFilledSlides,
            slideInFocus,
          ]);
        }
        savingToAlbum(slideInFocus);
        toaster("Slide saved successfully", "success");
      } else {
        const newErrors = [...errors];
        newErrors[slideInFocus] = {
          title: !validateTitle(album.stories[slideInFocus].title),
          description: !validateDescription(
            album.stories[slideInFocus].description
          ),
          category: !album.stories[slideInFocus].category,
          imageUrl: !isImageUrlValid,
        };
        setErrors(newErrors);
      }
    } else {
      setIsSlideEmpty(!false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const postStory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/update/add-story", {
        creatorId: id,
        stories: album.stories,
      });

      if (response.status === 200) {
        toast.success("Story Shared", {
          position: toast.POSITION.TOP_CENTER,
          icon: "",
        });
      } else {
        toast.error("Failed to share story", {
          position: toast.POSITION.TOP_CENTER,
          icon: "",
        });
      }
    } catch (error) {
      toast.error("Failed to share story", {
        position: toast.POSITION.TOP_CENTER,
        icon: "",
      });
      console.error("Error posting story:", error);
    } finally {
      setIsLoading(false);
      open();
    }
  };

  const { stories, clicked } = useContext(StoryContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (type === "update") {
          await clicked(storyId);
            setAlbum({
              stories: stories.slides.map((slide) => ({
                imageUrl: slide.imageUrl,
                title: slide.title,
                description: slide.description,
                category: slide.category,
              })),
            });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [type, storyId, clicked, stories]);
  
  const updateStory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/update/update-story`, {
        stories: album.stories,
        id: storyId
      });
  
      if (response.status === 200) {
        toast.success("Story Updated", {
          position: toast.POSITION.TOP_CENTER,
          icon: "",
        });
      } else {
        toast.error("Failed to update story", {
          position: toast.POSITION.TOP_CENTER,
          icon: "",
        });
      }
    } catch (error) {
      toast.error("Failed to update story", {
        position: toast.POSITION.TOP_CENTER,
        icon: "",
      });
      console.error("Error updating story:", error);
    } finally {
      setIsLoading(false);
      open();
    }
  };

  function toaster(message, type) {
    toast[type](message, { position: toast.POSITION.TOP_CENTER, icon: "" });
  }

  return (
    <div className={storyFormStyle.modal}>
      <div className={storyFormStyle.modalOverlay} onClick={open}></div>

      {isLoading && <Loading />}
      {!isLoading && (
        <div className={storyFormStyle.form}>
          {isSlideEmpty && (
            <label
              className={storyFormStyle.warningLabel}
              style={{ padding: "1rem 0" }}
            >
              Fill all the fields before Saving
            </label>
          )}
          <div className={storyFormStyle.contentContainer}>
            <div className={storyFormStyle.slides}>
              {[...Array(numSlidesAvailable)].map((_, index) => (
                <div
                  key={index}
                  className={storyFormStyle.cardWrapper}
                  style={{
                    boxShadow:
                      slideInFocus === index ? "0px 0px 0px 2px #73ABFF" : "",
                  }}
                >
                  <div
                    className={storyFormStyle.cards}
                    onClick={() => setSlideInFocus(index)}
                  >
                    Slide {index + 1}
                  </div>
                  {index > 2 && (
                    <img
                      src={minus}
                      alt="cut"
                      className={storyFormStyle.minusIcon}
                      onClick={handleRemoveSlide}
                    />
                  )}
                </div>
              ))}
              <div
                className={storyFormStyle.addButton}
                onClick={handleAddSlide}
                style={{
                  background:
                    numSlidesAvailable === 6 ? "hsl(0deg 0% 94.9%)" : "",
                  cursor: numSlidesAvailable === 6 ? "crosshair" : "pointer",
                }}
              >
                <img src={add} alt="add" />
                Add
              </div>
            </div>
            <div className={storyFormStyle.inputsContainer}>
              <div className={storyFormStyle.inputs}>
                <h4>Title</h4>
                <input
                  type="text"
                  value={album.stories[slideInFocus].title}
                  placeholder="Enter Title"
                  onChange={(e) => handleChange(e, "title")}
                  onBlur={() => handleBlur("title")}
                />
              </div>
              {errors[slideInFocus].title && (
                <label className={storyFormStyle.warningLabel}>
                  Title must be 30 characters or less
                </label>
              )}
              <div className={storyFormStyle.inputs}>
                <h4>Description</h4>
                <textarea
                  value={album.stories[slideInFocus].description}
                  placeholder="Enter description"
                  onChange={(e) => handleChange(e, "description")}
                  onBlur={() => handleBlur("description")}
                />
              </div>
              {errors[slideInFocus].description && (
                <label className={storyFormStyle.warningLabel}>
                  Description must be 20 words or less
                </label>
              )}
              <div className={storyFormStyle.inputs}>
                <h4>Image URL</h4>
                <input
                  type="text"
                  value={album.stories[slideInFocus].imageUrl}
                  placeholder="Enter image URL"
                  onChange={(e) => handleChange(e, "imageUrl")}
                  onBlur={() => handleBlur("imageUrl")}
                />
              </div>
              {errors[slideInFocus].imageUrl && (
                <label className={storyFormStyle.warningLabel}>
                  Invalid image URL
                </label>
              )}
              <div className={storyFormStyle.inputs}>
                <h4>Category</h4>
                <select
                  value={album.stories[slideInFocus].category}
                  onChange={(e) => handleChange(e, "category")}
                  onBlur={() => handleBlur("category")}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors[slideInFocus].category && (
                <label className={storyFormStyle.warningLabel}>
                  Category is required
                </label>
              )}
            </div>
          </div>

          <div className={storyFormStyle.buttonContainer}>
            <div
              className={`${storyFormStyle.buttons} ${storyFormStyle.prevButton}`}
              style={{
                background: "#7EFF73",
                pointerEvents: slideInFocus === 0 ? "none" : "auto",
              }}
              onClick={handlePreviousSlide}
            >
              <img
                src={previous}
                alt="previous"
                className={storyFormStyle.icons}
              />
              <p>Previous</p>
            </div>
            <div
              className={storyFormStyle.buttons}
              style={{
                background: "#73ABFF",
                pointerEvents:
                  slideInFocus === numSlidesAvailable - 1 ? "none" : "auto",
              }}
              onClick={handleNextSlide}
            >
              <img src={next} alt="next" className={storyFormStyle.icons} />
              <p>Next</p>
            </div>
            <div
              className={storyFormStyle.buttons}
              onClick={
                type === "post"
                  ? !(numSlidesFilled.length === numSlidesAvailable)
                    ? saveToAlbum
                    : postStory
                  : updateStory
              }
            >
              <img
                src={
                  !(numSlidesFilled.length === numSlidesAvailable) <= 2
                    ? save
                    : post
                }
                alt="post"
                className={storyFormStyle.icons}
              />
              <p>
                {type === "post"
                  ? !(numSlidesFilled.length === numSlidesAvailable)
                    ? "Save Slide"
                    : "Post"
                  : "Update"}
              </p>
            </div>
          </div>
          <div className={storyFormStyle.cut} onClick={open}>
            <img src={cut} alt="cut" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStory;
