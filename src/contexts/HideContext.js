import React, { useContext, useState, useEffect } from "react";

const HideContext = React.createContext();

export function useHide() {
  return useContext(HideContext);
}

export default function HideProvider({ children }) {
  const [isSomeHidden, setIsSomeHidden] = useState(false);
  const [currentHidden, setCurrentHidden] = useState("chat");

  const resize = () => {
    const WIDTH = 1020;
    if (window.innerWidth <= WIDTH) setIsSomeHidden(true);
    else setIsSomeHidden(false);
  };

  const hideChat = () => {
    setCurrentHidden("chat");
  };
  const hideList = () => {
    setCurrentHidden("list");
  };

  const isListHidden = isSomeHidden ? currentHidden === "list" : false;
  const isChatHidden = isSomeHidden ? currentHidden === "chat" : false;

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

    // eslint-disable-next-line
  }, []);

  const value = {
    isSomeHidden,
    isListHidden,
    isChatHidden,
    hideChat,
    hideList,
  };

  return <HideContext.Provider value={value}>{children}</HideContext.Provider>;
}
