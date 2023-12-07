import React from "react";
import { Link } from "react-router-dom";
import notFound from "./NotFound.module.css";
import png from "./noData.gif";

export default function NotFound() {
  return (
    <div className={notFound.page}>
      <h2>404 Page Not Found</h2>
      <img src={png} alt="" />
      <Link to="/" className={notFound.links}>
        <div className={notFound.buttons}>
          <p>Home</p>
        </div>
      </Link>
    </div>
  );
}
