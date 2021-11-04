import { FC, useRef } from "react";

interface IModalProps {
  content: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ content, isOpen, onClose }) => {
  const modalBackground = useRef(null);

  return (
    <>
      {isOpen && (
        <div
          ref={modalBackground}
          onClick={(e) => e.target === modalBackground.current && onClose()}
          className="modal"
        >
          <div className="modal__content">{content}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
