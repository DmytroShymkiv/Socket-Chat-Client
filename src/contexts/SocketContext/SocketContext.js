import React, { useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../ChatsContext";
import { useAuth } from "../AuthContext";
import { toastError } from "../../components/Toast/toastActions";

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
    updateSelectedChat,
    updateChatStatus,
    updateChatUnchecked,
  } = useChats();

  const { currentUser } = useAuth();

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

    socket.current.on(Actions.ClientJoin, (res) => {
      if (res.email && currentUser.email !== res.email) updateSelectedChat();
    });

    socket.current.on(Actions.ClientLeave, (res) => {
      if (res.email && currentUser.email !== res.email) updateSelectedChat();
    });

    socket.current.on(Actions.ClientMessage, (message) => {
      addMessage(message);
    });

    socket.current.on(Actions.ClientUpdate, (message) => {
      setEditedMessage(message);
    });

    socket.current.on(Actions.ClientDeleteMessage, (id) => {
      deleteMessage(id);
    });

    socket.current.on(Actions.ClientCreateRoom, (room) => {
      socket.current.emit(Actions.ServerJoinRoom, room.id);
      addRoom(room);
    });

    socket.current.on(Actions.ClientStartWriting, (res) => {
      if (res.user !== currentUser.id) updateChatStatus(res.room, "writing...");
    });

    socket.current.on(Actions.ClientStopWriting, (res) => {
      if (res.user !== currentUser.id) updateChatStatus(res.room, "dispatch");
    });

    socket.current.on(Actions.ClientReadMessage, (res) => {
      if (res.user === currentUser.id) updateChatUnchecked(res.room);
    });

    socket.current.on(Actions.ClientError, (err) => {
      toastError(err);
    });

    return () => {
      socket.current.disconnect();
    };

    // eslint-disable-next-line
  }, []);

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

  const readMessages = (roomId) => {
    socket.current.emit(Actions.ServerReadMessage, {
      id: roomId,
    });
  };

  const value = {
    sendMessage,
    updateMessage,
    deleteMessageEmit,
    createRoom,
    startWriting,
    stopWriting,
    readMessages,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
