import React from "react";
import cpStyle from "./CategoryPanel.module.css";
const All = require('../../assets/categories/all.jpg');
const Food = require('../../assets/categories/food.jpeg');
const Health = require('../../assets/categories/health.jpeg');
const Travel = require('../../assets/categories/travel.jpeg');
const Movies = require('../../assets/categories/movies.jpeg');
const Education = require('../../assets/categories/education.jpeg');

const categories = [
  { title: "All", url: 'url('+All+')' },
  { title: "Food", url: 'url('+Food+')' },
  { title: "Health & Fitness",  url: 'url('+Health+')' },
  { title: "Travel", url: 'url('+Travel+')' },
  { title: "Movies",  url: 'url('+Movies+')' },
  { title: "Education", url: 'url('+Education+')' },
];

const Category = ({ title, url}) => {
  return (
    <div className={cpStyle.card} style={{backgroundImage: url}}>
      <h3>{title}</h3>
    </div>
  );
};

const CatagoryPanel = () => {
  return (
    <div className={cpStyle.panel}>
      <div className={cpStyle.categoryContainer}>
        {categories.map((category, index) => (
          <Category key={index} title={category.title} url={category.url} />
        ))}
      </div>
    </div>
  );
};

export default CatagoryPanel;
