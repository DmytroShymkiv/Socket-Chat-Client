import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { toastMessage, toastError } from "../../components/Toast/toastActions";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../ChatsContext";
import { useAuth } from "../AuthContext";
import ChatService from "../../services/ChatService";
import FilesService from "../../services/FilesService";

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
    addRoom,
    chats,
    getAllChats,
    updateSelectedChat,
    updateChatStatus,
  } = useChats();
  const [localChats, setLocalChats] = useState(chats);
  const [localSelectedChat, setLocalSelectedChat] = useState(selectedChat);
  const { currentUser } = useAuth();

  useEffect(() => {
    !ChatService.chatListEquals(chats, localChats) && setLocalChats(chats);
  }, [chats]);

  useEffect(() => {
    !ChatService.selectedChatEquals(selectedChat, localSelectedChat) &&
      setLocalSelectedChat(selectedChat);
  }, [selectedChat]);

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

    socket.current.on(Actions.ClientJoin, async (res) => {
      if (currentUser.email !== res.email && res.email) {
        const rooms = await getAllChats();
        localSelectedChat && updateSelectedChat(localSelectedChat, rooms);
      }
    });

    socket.current.on(Actions.ClientLeave, async (res) => {
      if (currentUser.email !== res.email && res.email) {
        const rooms = await getAllChats();
        localSelectedChat && updateSelectedChat(localSelectedChat, rooms);
      }
    });

    socket.current.on(Actions.ClientMessage, (message) => {
      const chatName = ChatService.getChatNameById(message.room, chats);
      const file = FilesService.formatName(message.file && message.file.name);
      const text = message.text + " " + file;
      toastMessage(chatName, text, currentUser.email !== message.email);
      addMessage(selectedChat, message);
    });

    socket.current.on(Actions.ClientUpdate, (message) => {
      setEditedMessage(message, selectedChat);
    });

    socket.current.on(Actions.ClientDeleteMessage, (id) => {
      deleteMessage(id, selectedChat);
    });

    socket.current.on(Actions.ClientCreateRoom, (room) => {
      addRoom(room);
    });

    socket.current.on(Actions.ClientStartWriting, (res) => {
      if (res.user !== currentUser.id)
        updateChatStatus(res.room, "writing...", localChats);
    });

    socket.current.on(Actions.ClientStopWriting, (res) => {
      updateChatStatus(res.room, "dispatch", localChats);
    });

    socket.current.on(Actions.ClientError, (err) => {
      toastError(err);
    });

    return () => {
      socket.current.disconnect();
    };

    // eslint-disable-next-line
  }, [localSelectedChat, localChats]);

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

  const startWriting = (room) => {
    socket.current.emit(Actions.ServerStartWriting, {
      id: room,
    });
  };

  const stopWriting = (room) => {
    socket.current.emit(Actions.ServerStopWriting, {
      id: room,
    });
  };

  const value = {
    sendMessage,
    updateMessage,
    deleteMessageEmit,
    createRoom,
    startWriting,
    stopWriting,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
