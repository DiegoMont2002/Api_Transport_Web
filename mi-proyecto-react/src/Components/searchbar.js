import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <nav className="navbar">
      <input type="text" className="search-bar" placeholder="Buscar..." />
    </nav>
  );
};

export default SearchBar;

