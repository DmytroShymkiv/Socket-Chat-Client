import React, { useContext, useState } from "react";

import { useAuth } from "./AuthContext";
import ChatService from "../services/ChatService";
import { sortChats } from "../utils";
import { toastMessage } from "../components/Toast/toastActions";

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export default function ChatsProvider({ children }) {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const [start, setStart] = useState(0);

  const getChats = async (start, howMany) => {
    const chats = await ChatService.getChats(start, howMany);
    setChats(chats);
    return chats;
  };

  const getAllChats = () => {
    return getChats(0, 0);
  };

  const addRoom = (room) => {
    setChats((prev) => [...prev, room]);
  };

  const getChatRoom = async (chat, start, howMany) => {
    const messages = await ChatService.getMessages(chat, start, howMany);
    setSelectedChat((prev) => ({
      chat,
      messages:
        prev && prev.messages && prev.chat.id === chat.id
          ? [...messages, ...prev.messages]
          : messages,
    }));
    setLoading(false);
    return messages;
  };

  const addMessage = (message) => {
    showNotification(message);
    addMessageToRoom(message);
    const anchor = document.getElementById("messagesEnd");
    anchor &&
      anchor.scrollIntoView({
        behavior: "smooth",
      });
  };

  const deleteMessage = async (id) => {
    await getAllChats();
    setSelectedChat((prev) => {
      if (!prev) return;
      const updatedMessages = ChatService.deleteMessageFromRoom(id, prev);
      if (updatedMessages) return { ...prev, messages: updatedMessages };
    });
  };

  const updateSelectedChat = async () => {
    const rooms = await getAllChats();
    setSelectedChat((prev) => {
      if (!prev) return;
      const chat = rooms.find((el) => el.id === prev.chat.id);
      return { ...prev, chat };
    });
  };

  const setEditedMessage = async (message) => {
    await getAllChats();
    setSelectedChat((prev) => {
      if (!prev) return;
      const updatedMessage = ChatService.setEditedMessage(message, prev);
      if (updatedMessage) return { ...prev, messages: updatedMessage };
    });
  };

  const getChatMessagesCount = (chat) => {
    return ChatService.getChatMessagesCount(chat);
  };

  const updateChatStatus = (id, status) => {
    setChats((prev) => {
      const updatedChats = ChatService.updateChatStatus(id, prev, status);
      return updatedChats;
    });
  };

  const updateChatUnchecked = (id) => {
    setChats((prev) => {
      const updatedChats = ChatService.updateChatUnchecked(id, prev);
      return updatedChats;
    });
  };

  async function showNotification(message) {
    const chatsForToast = await getAllChats();
    chatsForToast && toastMessage(message, chatsForToast, currentUser.email);
  }

  function addMessageToRoom(message) {
    setSelectedChat((prev) => {
      if (prev && prev.chat.id === message.room) {
        const updatedMessages = ChatService.addMessageToRoom(
          prev,
          message,
          currentUser.email
        );
        return { ...prev, messages: updatedMessages };
      }
    });
  }

  const value = {
    chats: sortChats(chats),
    selectedChat,
    setSelectedChat,
    loading,
    setLoading,
    start,
    setStart,
    getChats,
    getChatRoom,
    addMessage,
    deleteMessage,
    getChatMessagesCount,
    setEditedMessage,
    addRoom,
    updateChatStatus,
    getAllChats,
    updateSelectedChat,
    updateChatUnchecked,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
