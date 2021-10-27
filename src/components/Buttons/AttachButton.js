import React, { useState, useRef } from "react";

import plus from "../../assets/icons/plus.png";
import file from "../../assets/icons/file.png";
import photo from "../../assets/icons/image.png";
import film from "../../assets/icons/film.png";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function AttachButton({ setFile }) {
  const [showMore, setShowMore] = useState(false);
  const attachBtnRef = useRef(null);

  useOutsideClick(attachBtnRef, () => setShowMore(false));

  const acceptedFormat = {
    photo: ".jpg, .jpeg, .png, .svg",
    film: ".mp4",
  };

  const images = {
    file,
    photo,
    film,
  };

  function Button({ name }) {
    const image = images[name];
    const format = acceptedFormat[name];

    const handleChange = (e) => {
      const file = e.target.files[0];
      setFile({ originalName: file.name, size: file.size, buffer: file });
    };

    return (
      <div className="message-form__button">
        <label htmlFor={`file-input/${image}`}>
          <img src={image} alt="file" />
        </label>

        <input
          id={`file-input/${image}`}
          type="file"
          accept={format}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="attach-button__open" ref={attachBtnRef}>
      <button
        className="message-form__button"
        onClick={() => setShowMore((prev) => !prev)}
        type="button"
      >
        <img src={plus} alt="plus" />
      </button>
      {showMore && (
        <form enctype="multipart/form-data" className="attach-button__more">
          <Button name="file" />
          <Button name="photo" />
          <Button name="film" />
        </form>
      )}
    </div>
  );
}
