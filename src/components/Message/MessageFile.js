import React, { useEffect, useState } from "react";

import FilesService from "../../services/FilesService";
import fileImage from "../../assets/icons/file.png";

export default function MessageFile({ file }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!file) return;

    const nameSplitByDot = file.name.split(".");
    const fileType = nameSplitByDot[nameSplitByDot.length - 1];

    if (fileType === "jpeg" || fileType === "png" || fileType === "jpg")
      setImage(FilesService.BASE_URL + file.name);

    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    FilesService.downloadFile(file.name);
  };

  function File() {
    return (
      <div className="message__file" onClick={handleClick}>
        <img src={fileImage} alt="file" />
        <p>{file.name}</p>
      </div>
    );
  }

  return (
    <>{file && ((image && <img src={image} alt={file.name} />) || <File />)}</>
  );
}
