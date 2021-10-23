import React from "react";

import more from "../../assets/icons/chevron-down.png";
import search from "../../assets/icons/search.png";

export default function Search() {
  return (
    <div className="search">
      <div className="search__form">
        <img src={search} alt="search" />
        <form>
          <input className="search__form-input" placeholder="Search" />
        </form>
      </div>
      <div className="search__filter">
        <p>Messages</p>
        <img src={more} alt="more" />
      </div>
    </div>
  );
}
