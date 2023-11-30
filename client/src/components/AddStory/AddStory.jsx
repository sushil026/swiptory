import React, { useState } from "react";
import storyFormStyle from "./AddStory.module.css";
import cut from "../../assets/cut.svg";
import add from "../../assets/add.svg";
import minus from "../../assets/minus.svg";
import post from "../../assets/post.svg";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import save from "../../assets/save.svg";
import { toast } from "react-toastify";

const AddStory = ({ open }) => {
  const [album, setAlbum] = useState({
    category: "",
    stories: [
      { imageUrl: "", title: "", description: "", category: "" },
      { imageUrl: "", title: "", description: "", category: "" },
      { imageUrl: "", title: "", description: "", category: "" },
    ],
  });

  const [errors, setErrors] = useState([
    { imageUrl: false, title: false, description: false, category: false },
    { imageUrl: false, title: false, description: false, category: false },
    { imageUrl: false, title: false, description: false, category: false },
  ]);

  const [slideInFocus, setSlideInFocus] = useState(0);
  const [numSlidesAvailable, setNumSlidesAvailable] = useState(3);
  const [numSlidesFilled, setNumSlidesFilled] = useState(0);

  const categories = [
    "Food",
    "Health & Fitness",
    "Travel",
    "Movies",
    "Education",
  ];

  const validateTitle = (title) => title.length <= 20;
  const validateDescription = (description) => {
    const words = description.split(/\s+/);
    return words.length <= 10;
  };

  const handleChange = (e, field) => {
    const newAlbum = { ...album };
    const newErrors = [...errors];

    const value = e.target.value;
    if (field === "category") {
      newAlbum[field] = value;
      newAlbum.stories.forEach((slide, slideIndex) => {
        if (slideIndex === slideInFocus) {
          slide[field] = value;
        }
      });
    } else {
      newAlbum.stories[slideInFocus][field] = value;
    }
    newErrors[slideInFocus][field] = !validateField(value, field);
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

  const handleBlur = (field) => {
    performValidation(slideInFocus, field);
  };

  const [imageLoaded, setImageLoaded] = useState(!true);

  const checkImageExists = async () => {
    const newErrors = [...errors];
    newErrors[slideInFocus].image = false;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });
    };
    try {
      await loadImage(album.stories[slideInFocus].imageUrl);
      setImageLoaded(true);
    } catch (error) {
      setImageLoaded(false);
    }

    return imageLoaded;
  };

  const performValidation = (index, field) => {
    const newErrors = [...errors];
    const slide = album.stories[index];

    switch (field) {
      case "title":
        newErrors[index].title = !validateTitle(slide.title);
        break;
      case "description":
        newErrors[index].description = !validateDescription(slide.description);
        break;
      case "category":
        newErrors[index].category = !slide.category;
        break;
      case "imageUrl":
        newErrors[index].imageUrl = !checkImageExists(slide.imageUrl);
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
            category: album.category,
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
    if (numSlidesAvailable > 3) {
      const newAlbum = { ...album };
      const newErrors = [...errors];

      newAlbum.stories.pop();
      newErrors.pop();

      setAlbum(newAlbum);
      setErrors(newErrors);
      setNumSlidesAvailable((prevNumSlides) => prevNumSlides - 1);

      setNumSlidesFilled((prevNumSlides) => Math.max(0, prevNumSlides - 1));

      if (slideInFocus >= numSlidesAvailable - 1) {
        setSlideInFocus(numSlidesAvailable - 2);
      }
    }
  };

  const handlePreviousSlide = () => {
    if (slideInFocus > 0) {
      setSlideInFocus((prevIndex) => prevIndex - 1);
      performValidation(slideInFocus - 1);
    }
  };

  const handleNextSlide = () => {
    if (slideInFocus < numSlidesAvailable - 1) {
      setSlideInFocus((prevIndex) => prevIndex + 1);
      performValidation(slideInFocus + 1);
    }
  };
  const savingToAlbum = (index) => {
    const newAlbum = { ...album };
    newAlbum.stories[index] = { ...album.stories[index] };
    setAlbum(newAlbum);
  };

  const saveToAlbum = (e) => {
    e.preventDefault();
    const isValid =
      validateTitle(album.stories[slideInFocus].title) &&
      validateDescription(album.stories[slideInFocus].description);

    if (isValid) {
      const hasErrors =
        errors[slideInFocus].title ||
        errors[slideInFocus].description ||
        errors[slideInFocus].category;

      if (!hasErrors) {
        const newAlbum = { ...album };
        newAlbum.stories[slideInFocus] = { ...album.stories[slideInFocus] };
        setAlbum(newAlbum);
        setNumSlidesFilled(numSlidesFilled + 1);
        console.log("Success");
        setNumSlidesFilled(numSlidesFilled + 1);
        savingToAlbum(slideInFocus);
      }
    } else {
      const newErrors = [...errors];
      newErrors[slideInFocus] = {
        title: !validateTitle(album.stories[slideInFocus].title),
        description: !validateDescription(
          album.stories[slideInFocus].description
        ),
        category: !album.stories[slideInFocus].category,
      };
      setErrors(newErrors);
      console.log(
        `Invalid data for Slide ${
          slideInFocus + 1
        }. Please check the input fields.`
      );
    }
  };
  console.log(numSlidesFilled)

  const postStory = async () => {
    console.log("posting");
    // try {
    //   // Assuming your backend endpoint is '/api/postStory'
    //   const response = await fetch('/api/postStory', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // You may need to include additional headers like authorization if required
    //     },
    //     body: JSON.stringify(album),
    //   });

    //   if (response.ok) {
    //     console.log('Album posted successfully!');
    //   } else {
    //     console.error('Failed to post album:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error posting album:', error.message);
    // }
  };

  return (
    <div className={storyFormStyle.modal}>
      <div className={storyFormStyle.modalOverlay} onClick={open}></div>
      <div className={storyFormStyle.form}>
        {numSlidesFilled < 3 && (
          <label
            className={storyFormStyle.warningLabel}
            style={{ padding: "1rem 0" }}
          >
            Minimum 3 slides required
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
                Title must be 20 characters or less
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
                Description must be 10 words or less
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
                value={album.category}
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
            onClick={numSlidesFilled <= 2 ? saveToAlbum : postStory}
          >
            <img
              src={numSlidesFilled <= 2 ? save : post}
              alt="post"
              className={storyFormStyle.icons}
            />
            <p>{numSlidesFilled <= 2 ? "Save Slide" : "Post"}</p>
          </div>
        </div>
        <div className={storyFormStyle.cut} onClick={open}>
          <img src={cut} alt="cut" />
        </div>
      </div>
    </div>
  );
};

export default AddStory;

//   function toaster() {
//     toast.error("Story Shared", { position: toast.POSITION.TOP_CENTER, icon: ""});
//   }
