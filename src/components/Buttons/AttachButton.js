import React, { useState } from "react";

import plus from "../../assets/icons/plus.png";
import file from "../../assets/icons/file.png";
import photo from "../../assets/icons/image.png";
import film from "../../assets/icons/film.png";

export default function AttachButton() {
  const [showMore, setShowMore] = useState(false);

  function Button({ image }) {
    return (
      <div className="message-form__button">
        <label htmlFor={`file-input/${image}`}>
          <img src={image} alt="file"/>
        </label>

        <input id={`file-input/${image}`} type="file" />
      </div>
    );
  }

  return (
    <div className="attach-button__open">
      <button
        className="message-form__button"
        onClick={() => setShowMore((prev) => !prev)}
        type="button"
      >
        <img src={plus} alt="plus" />
      </button>
      <div
        style={{ display: showMore ? "flex" : "none" }}
        className="attach-button__more"
      >
        <Button image={file} />
        <Button image={photo} />
        <Button image={film} />
      </div>
    </div>
  );
}
