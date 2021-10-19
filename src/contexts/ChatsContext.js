import React, { useContext, useState } from "react";
import axios from "axios";

import { handleError, getToken } from "../utils";

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export default function ChatsProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  const getChats = async (start, howMany) => {
    const url = `${BASE_URL}/chat-list/${start}/${howMany}`;
    return await handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      setChats(response.data);
      return true;
    });
  };

  const getChatRoom = async (chat, start, howMany) => {
    const url = `${BASE_URL}/chat-room/${chat.id}/${start}/${howMany}`;
    return await handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      setSelectedChat({ chat, messages: response.data });
      return true;
    });
  };

  const value = {
    chats,
    selectedChat,
    getChats,
    getChatRoom,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
