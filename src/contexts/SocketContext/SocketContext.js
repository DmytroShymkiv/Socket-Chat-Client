import React, { useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../ChatsContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  const socket = useRef(null);
  const {
    selectedChat,
    addMessage,
    setEditedMessage,
    deleteMessage,
    getAllChats,
    chats,
  } = useChats();

  useEffect(() => {
    const SERVER_URL = "http://localhost:3001";

    socket.current = io(SERVER_URL, {
      auth: {
        token: getToken(),
      },
    });

    socket.current.on(Actions.ClientConnection, (res) => {
      console.log(res);
    });

    socket.current.on(Actions.ClientMessage, (message) => {
      addMessage(selectedChat, message);
    });

    socket.current.on(Actions.ClientUpdate, (message) => {
      selectedChat && setEditedMessage(message, selectedChat);
    });

    socket.current.on(Actions.ClientDeleteMessage, (id) => {
      selectedChat && deleteMessage(id, selectedChat);
    });

    socket.current.on(Actions.ClientCreateRoom, () => {
      getAllChats();
    });

    return () => {
      socket.current.disconnect();
    };

    // eslint-disable-next-line
  }, [selectedChat, chats]);

  const sendMessage = (message, file) => {
    socket.current.emit(Actions.ServerSendMessage, {
      room: selectedChat.chat.id,
      message,
      file,
    });
  };

  const updateMessage = (id, text) => {
    socket.current.emit(Actions.ServerUpdateMessage, {
      id,
      text,
    });
  };

  const deleteMessageEmit = (id) => {
    socket.current.emit(Actions.ServerDeleteMessage, {
      id,
    });
  };

  const createRoom = (users, photo, name) => {
    socket.current.emit(Actions.ServerCreateRoom, {
      users,
      photo,
      name,
    });
  };

  const value = { sendMessage, updateMessage, deleteMessageEmit, createRoom };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
