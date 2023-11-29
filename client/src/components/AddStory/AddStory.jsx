import React, { useState } from "react";
import storyFormStyle from "./AddStory.module.css";
import cut from "../../assets/cut.svg";
import add from "../../assets/add.svg";
import minus from "../../assets/minus.svg";
import post from '../../assets/post.svg';
import next from '../../assets/next.svg';
import previous from '../../assets/previous.svg';

const AddStory = ({ open }) => {
  const [formState, setFormState] = useState({
    heading: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    wordCount: false,
    headingLength: false,
    image: false,
    field: false,
  });

  const [imageLoaded, setImageLoaded] = useState(true);

  const [inFocus, setInFocus] = useState(0);
  const categories = ["Food", "Health & Fitness", "Travel", "Education"];

  const validateHeading = (value) => {
    return value.length > 20;
  };

  const validateDescription = (value) => {
    const words = value.trim().split(/\s+/);
    return words.length > 20;
  };

  const handleChange = (e, field) => {
    const { value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      field: false,
    }));

    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));

    if (field === "heading") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        headingLength: validateHeading(value),
      }));
    } else if (field === "description") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        wordCount: validateDescription(value),
      }));
    }
  };

  const checkImageExists = () => {
    setImageLoaded(false);
    const img = new Image();
    img.src = formState.imageUrl;
    img.onload = () => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: false,
      }));
      setImageLoaded(true);
    };
    img.onerror = () => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: true,
      }));
    };
  };

  const handleSubmit = () => {
    const { heading, description, imageUrl, category } = formState;
    setErrors((prevErrors) => ({ ...prevErrors, field: false }));
    if (!heading || !description || !imageUrl || !category) {
      setErrors((prevErrors) => ({ ...prevErrors, field: true }));
      console.log("mpt fields");
      return;
    }
    if (
      errors.field ||
      errors.headingLength ||
      errors.wordCount ||
      !imageLoaded
    ) {
      console.log("some error");
      return;
    }
    savingStory();
  };

  const savingStory =()=>{
    console.log('saving')
  }


  const [visibleCards, setVisibleCards] = useState(3);

  const openCard = () => {
    if (visibleCards < 6) {
      setVisibleCards(visibleCards + 1);
    }
  };

  const gotoNextCard = () => {
    if (inFocus + 1 < visibleCards) {
      setInFocus(inFocus + 1);
    }
  };

  const gotoPreviousCard = () => {
    if (inFocus > 0) {
      setInFocus(inFocus - 1);
    }
  };

  const selectCard = (index) => {
    if (index < visibleCards) {
      setInFocus(index);
    }
  };

  const closeCard = () => {
    if( inFocus === visibleCards-1){
      setInFocus(visibleCards-2)
    }
    setVisibleCards(visibleCards - 1);
  };

  return (
    <div className={storyFormStyle.modal}>
      <div className={storyFormStyle.modalOverlay} onClick={open}></div>
      <div className={storyFormStyle.form}>
        <div className={storyFormStyle.contentContainer}>
          <div className={storyFormStyle.slides}>
            {[...Array(visibleCards)].map((_, index) => (
              <div key={index} className={storyFormStyle.cardWrapper} style={{
                boxShadow: inFocus === index ? "0px 0px 0px 2px #73ABFF" : "",
              }}>
                <div
                  className={storyFormStyle.cards}
                  onClick={() => selectCard(index)}
                  
                >
                  Slide {index + 1}
                </div>
                {index > 2 && (
                  <img
                    src={minus}
                    alt="cut"
                    className={storyFormStyle.minusIcon}
                    onClick={() => closeCard()}
                  />
                )}
              </div>
            ))}
            <div
              className={storyFormStyle.addButton}
              onClick={openCard}
              style={{
                background: visibleCards === 6 ? "hsl(0deg 0% 94.9%)" : "",
                cursor: visibleCards === 6 ? "crosshair" : "pointer",
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
                value={formState.heading}
                placeholder="Enter Title"
                onChange={(e) => handleChange(e, "heading")}
              />
            </div>
            {errors.headingLength && (
              <label className={storyFormStyle.warningLabel}>
                Maximum 20 characters allowed for the heading
              </label>
            )}
            <div className={storyFormStyle.inputs}>
              <h4>Description</h4>
              <textarea
                value={formState.description}
                placeholder="Enter description"
                onChange={(e) => handleChange(e, "description")}
              />
            </div>
            {errors.wordCount && (
              <label className={storyFormStyle.warningLabel}>
                Maximum 20 words allowed
              </label>
            )}
            <div className={storyFormStyle.inputs}>
              <h4>Image URL</h4>
              <input
                type="text"
                value={formState.imageUrl}
                placeholder="Enter image URL"
                onChange={(e) => handleChange(e, "imageUrl")}
                onBlur={checkImageExists}
              />
            </div>
            {errors.image && (
              <label className={storyFormStyle.warningLabel}>
                Invalid image URL
              </label>
            )}
            <div className={storyFormStyle.inputs}>
              <h4>Category</h4>
              <select
                value={formState.category}
                onChange={(e) =>
                  setFormState({ ...formState, category: e.target.value })
                }
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
            {errors.field && (
              <label className={storyFormStyle.warningLabel}>
                Please fill all the fields
              </label>
            )}
          </div>
        </div>

        <div className={storyFormStyle.buttonContainer}>
          <div
            className={storyFormStyle.buttons}
            style={{ background: "#7EFF73" }}
            onClick={gotoPreviousCard}
          >
            <img src={previous} alt="previous" className={storyFormStyle.icons} />
            <p>Previous</p>
          </div>
          <div
            className={storyFormStyle.buttons}
            style={{ background: "#73ABFF" }}
            onClick={gotoNextCard}
          >
          <img src={next} alt="next" className={storyFormStyle.icons} />
            <p>Next</p>
          </div>
          <div className={storyFormStyle.buttons} onClick={handleSubmit}>
            <img src={post} alt="post" className={storyFormStyle.icons} />
            <p>Post</p>
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
