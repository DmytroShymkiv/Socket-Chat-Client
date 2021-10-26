import React, { useRef } from "react";

export default function Modal({ content, isOpen, onClose }) {
  const modalBackground = useRef();

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
}