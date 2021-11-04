import { useState, useRef, FC, ChangeEvent } from "react";

import plus from "../../assets/icons/plus.png";
import file from "../../assets/icons/file.png";
import photo from "../../assets/icons/image.png";
import film from "../../assets/icons/film.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IFile } from "../../types/file.types";

interface IAttachButtonProps {
  setFile: (file: IFile) => void;
}

const AttachButton: FC<IAttachButtonProps> = ({ setFile }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const attachBtnRef = useRef(null);

  useOutsideClick(attachBtnRef, () => setShowMore(false));

  const acceptedFormat = {
    photo: ".jpg, .jpeg, .png, .svg",
    film: ".mp4",
    file: undefined,
  };

  const images = {
    file,
    photo,
    film,
  };

  type imageType = "file" | "photo" | "film";

  const Button: FC<{ name: imageType }> = ({ name }) => {
    const image = images[name];
    const format = acceptedFormat[name];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const file = files && files[0];
      file &&
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
  };

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
        <div className="attach-button__more">
          <Button name="file" />
          <Button name="photo" />
          <Button name="film" />
        </div>
      )}
    </div>
  );
};

export default AttachButton;
