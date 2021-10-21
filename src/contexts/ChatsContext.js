import React, { useContext, useState } from "react";
import axios from "axios";

import { handleError, getToken } from "../utils";
import { useAuth } from "./AuthContext";

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export default function ChatsProvider({ children }) {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [start, setStart] = useState(0);

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
    if (start < 0) {
      const tmp = howMany + start;
      start = 0;
      howMany = tmp;
    }
    const url = `${BASE_URL}/chat-room/${chat.id}/${start}/${howMany}`;
    return await handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      setSelectedChat((prev) => ({
        chat,
        messages:
          prev && prev.messages && prev.chat.id === chat.id 
            ? [...response.data, ...prev.messages]
            : response.data,
      }));
      return true;
    });
  };

  const addMessage = (room, message) => {
    updateLastMessage(message);
    addMessageToRoom(room, message);
  };

  function updateLastMessage(message) {
    const { room } = message;
    const updatedChats = [...chats];
    const chatIndex = updatedChats.findIndex((el) => el.id === room);
    updatedChats[chatIndex].message = message.text;
    updatedChats[chatIndex].time = message.date;
    setChats(updatedChats);
  }

  function addMessageToRoom(room, message) {
    if (room && room.chat.id === message.room) {
      const updatedMessages = [...room.messages];
      const isMyMessage = currentUser.email === message.email;
      updatedMessages.push({
        ...message,
        type: isMyMessage ? "user" : "member",
        status: "send",
      });
      setSelectedChat({ ...room, messages: updatedMessages });
    }
  }

  async function getChatMessagesCount(chat) {
    const url = `${BASE_URL}/chat-room/messages-count/${chat.id}`;
    return await handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      return response.data;
    });
  }

  const value = {
    chats,
    selectedChat,
    setSelectedChat,
    start,
    setStart,
    getChats,
    getChatRoom,
    addMessage,
    getChatMessagesCount,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
