import React from "react";

const SearchBar = ({ searchfield, searchChange }) => {
  return (
    <div className="container pl-4 pr-4">
      <input
        className="form-control mb-2 mt-2"
        type="search"
        placeholder="Filtruj"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBar;
