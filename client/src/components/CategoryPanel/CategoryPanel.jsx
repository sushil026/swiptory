import React, { useContext, useState } from "react";
import cpStyle from "./CategoryPanel.module.css";
import { UserContext } from "../../UserContext";


const All = require("../../assets/categories/all.jpg");
const Food = require("../../assets/categories/food.jpeg");
const Health = require("../../assets/categories/health.jpeg");
const Travel = require("../../assets/categories/travel.jpeg");
const Movies = require("../../assets/categories/movies.jpeg");
const Education = require("../../assets/categories/education.jpeg");

const categories = [
  { title: "All", url: "url(" + All + ")" },
  { title: "Food", url: "url(" + Food + ")" },
  { title: "Health & Fitness", url: "url(" + Health + ")" },
  { title: "Travel", url: "url(" + Travel + ")" },
  { title: "Movies", url: "url(" + Movies + ")" },
  { title: "Education", url: "url(" + Education + ")" },
];

const Category = ({ title, url, setSelectedCategory, selected }) => {
  return (
    <div
      className={cpStyle.card}
      style={{
        backgroundImage: url,
        boxShadow: selected ? "0px 0px 0px 4px #73ABFF" : "",
      }}
      onClick={() => setSelectedCategory(title)}
    >
      <span>{title}</span>
    </div>
  );
};

const CatagoryPanel = () => {
  const { selectedCategory, setSelectedCategory} = useContext(UserContext);
  return (
    <div className={cpStyle.panel}>
      <div className={cpStyle.categoryContainer}>
        {categories.map((category, index) => (
          <Category
            key={index}
            title={category.title}
            url={category.url}
            setSelectedCategory={setSelectedCategory}
            selected={selectedCategory === category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default CatagoryPanel;
