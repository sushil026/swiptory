import React from "react";
import { Link } from "react-router-dom";

const Bookmark = () => {
  return (
    <div>
      <h1>Bookmark Page</h1>
      <p>This is the bookmarked content.</p>
      {/* Use Link with custom style */}
      <Link to="/" >
        Go to Home
      </Link>
    </div>
  );
};

export default Bookmark;