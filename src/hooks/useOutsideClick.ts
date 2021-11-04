import { RefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLElement>,
  onClick: Function
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {      
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line
  }, [ref]);
}
