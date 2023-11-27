import { useState } from "react";
import { Link } from "react-router-dom";

function Pagination({ children, onSetPage, page, search, isSearch }) {
  const isSelected = children === page;

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: "#c1121f",
    color: "#fff",
    listStyle: "none",
  };
  return (
    <ul>
      <Link
        to={isSearch ? `/q?name=${search}` : null}
        onClick={() => onSetPage(children)}
        className="text-decoration-none"
      >
        <li className={isSelected ? "active-page" : null} style={style}>
          {children}
        </li>
      </Link>
    </ul>
  );
}

export default Pagination;
