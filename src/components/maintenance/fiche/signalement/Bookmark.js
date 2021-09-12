import React from "react";

const Bookmark = ({ isActive, onToggleActive, id }) => {
  const getClass = (isActive) => {
    return isActive ? "bi bi-bookmark-fill" : "bi bi-bookmark";
  };
  return (
    <button onClick={() => onToggleActive(id)}>
      <i className={getClass(isActive)}></i>
    </button>
  );
};

export default Bookmark;
