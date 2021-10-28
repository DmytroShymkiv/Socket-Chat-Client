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
      setImage(file.href);

    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    FilesService.downloadFile(file.name);
  };

  function File() {
    const name = FilesService.formatName(file.name);
    
    return (
      <div className="message__file" onClick={handleClick}>
        <img src={fileImage} alt="file" />
        <p>{name}</p>
      </div>
    );
  }

  return (
    <>{file && ((image && <img src={image} alt={file.name} />) || <File />)}</>
  );
}
