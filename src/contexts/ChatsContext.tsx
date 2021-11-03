import React, { FC, useContext, useState } from "react";

import { useAuth } from "./AuthContext";
import ChatService from "../services/ChatService";
import { sortChats } from "../utils";
import { toastMessage } from "../components/Toast/toastActions";
import {
  IChat,
  IMessage,
  ISelectedChat,
  statusType,
} from "../types/chat.types";
import { IMessageResponse } from "../types/socket.types";
import { IError } from "../types/error.type";

interface IContextValue {
  chats: IChat[];
  selectedChat?: ISelectedChat;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<ISelectedChat | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getChats: (start: number, howMany: number) => Promise<IChat[] | IError>;
  getChatRoom: (
    chat: IChat,
    start: number,
    howMany: number
  ) => Promise<IError | IMessage[]>;
  addMessage: (message: IMessageResponse) => void;
  deleteMessage: (id: string) => Promise<void>;
  getChatMessagesCount: (chat: IChat) => Promise<number | IError>;
  setEditedMessage: (message: IMessage) => Promise<void>;
  addRoom: (room: IChat) => void;
  updateChatStatus: (id: string, status: statusType) => void;
  getAllChats: () => Promise<IChat[] | IError>;
  updateSelectedChat: () => Promise<void>;
  updateChatUnchecked: (id: string) => void;
}

const ChatsContext = React.createContext<IContextValue>({} as IContextValue);

export function useChats(): IContextValue {
  return useContext(ChatsContext);
}

const ChatsProvider: FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ISelectedChat | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getChats = async (start: number, howMany: number) => {
    const chats = await ChatService.getChats(start, howMany);
    const { errors } = chats as IError;
    !errors && setChats(chats as IChat[]);
    return chats;
  };

  const getAllChats = () => {
    return getChats(0, 0);
  };

  const addRoom = (room: IChat) => {
    setChats((prev) => [...prev, room]);
  };

  const getChatRoom = async (chat: IChat, start: number, howMany: number) => {
    let messages = await ChatService.getMessages(chat, start, howMany);
    const { errors } = messages as IError;
    if (!errors) {
      messages = messages as IMessage[];
      setSelectedChat((prev) => ({
        chat,
        messages:
          prev && prev.messages && prev.chat.id === chat.id
            ? [...(messages as IMessage[]), ...prev.messages]
            : (messages as IMessage[]),
      }));
    }
    setLoading(false);
    return messages;
  };

  const addMessage = (message: IMessageResponse) => {
    showNotification(message);
    addMessageToRoom(message);
    const anchor = document.getElementById("messagesEnd");
    anchor &&
      anchor.scrollIntoView({
        behavior: "smooth",
      });
  };

  const deleteMessage = async (id: string) => {
    await getAllChats();
    setSelectedChat((prev) => {
      if (!prev) return;
      const updatedMessages = ChatService.deleteMessageFromRoom(id, prev);
      if (updatedMessages) return { ...prev, messages: updatedMessages };
    });
  };

  const updateSelectedChat = async () => {
    const rooms = await getAllChats();
    const { errors } = rooms as IError;
    !errors &&
      setSelectedChat((prev) => {
        if (!prev) return;
        const chat = (rooms as IChat[]).find((el) => el.id === prev.chat.id);
        if (!chat) return;
        return { ...prev, chat };
      });
  };

  const setEditedMessage = async (message: IMessage) => {
    await getAllChats();
    setSelectedChat((prev) => {
      if (!prev) return;
      const updatedMessage = ChatService.setEditedMessage(message, prev);
      if (updatedMessage) return { ...prev, messages: updatedMessage };
    });
  };

  const getChatMessagesCount = (chat: IChat) => {
    return ChatService.getChatMessagesCount(chat);
  };

  const updateChatStatus = (id: string, status: statusType) => {
    setChats((prev) => ChatService.updateChatStatus(id, prev, status));
  };

  const updateChatUnchecked = (id: string) => {
    setChats((prev) => ChatService.updateChatUnchecked(id, prev));
  };

  async function showNotification(message: IMessageResponse) {
    const chatsForToast = await getAllChats();
    chatsForToast && toastMessage(message, chatsForToast, currentUser?.email);
  }

  function addMessageToRoom(message: IMessageResponse) {
    setSelectedChat((prev) => {
      if (prev && prev.chat.id === message.room) {
        const updatedMessages = ChatService.addMessageToRoom(
          prev,
          message,
          currentUser?.email
        );
        return { ...prev, messages: updatedMessages };
      }
    });
  }

  const value: IContextValue = {
    chats: sortChats(chats),
    selectedChat,
    setSelectedChat,
    loading,
    setLoading,
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
};

export default ChatsProvider;