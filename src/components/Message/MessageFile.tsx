import { useEffect, useState, FC } from "react";

import FilesService from "../../services/FilesService";
import fileImage from "../../assets/icons/file.png";
import { IMessageFile } from "../../types/file.types";

const MessageFile: FC<{ file: IMessageFile }> = ({ file }) => {
  const [image, setImage] = useState<string | null>(null);

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
    <>{(image && <img src={image} alt={file.name} />) || <File />}</>
  );
};

export default MessageFile;
