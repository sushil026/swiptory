import React from "react";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "inherit", // Inherit the text color from the parent
  };

  return (
    <div>
      <h1>Bookmark Page</h1>
      <p>This is the bookmarked content.</p>
      {/* Use Link with custom style */}
      <Link to="/" style={linkStyle}>
        Go to Home
      </Link>
      {/* Add other components or elements for the bookmarked page */}
    </div>
  );
};

export default Bookmark;