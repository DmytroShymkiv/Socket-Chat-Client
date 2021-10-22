import { useEffect, useRef } from "react";
import io from "socket.io-client";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../../contexts/ChatsContext";

export default function useSocket() {
  const socket = useRef(null);
  const { selectedChat, addMessage, setEditedMessage, deleteMessage } =
    useChats();

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
      console.log(message);
      selectedChat &&
        selectedChat.messages &&
        addMessage(selectedChat, message); // try to use selected chat inside action ???
    });

    socket.current.on(Actions.ClientUpdate, (message) => {
      selectedChat && setEditedMessage(message, selectedChat);
    });

    socket.current.on(Actions.ClientDeleteMessage, (id) => {
      selectedChat && deleteMessage(id, selectedChat);
    });

    return () => {
      socket.current.disconnect();
    };

    // eslint-disable-next-line
  }, [selectedChat]); // change this dependency ???

  const sendMessage = (message) => {
    socket.current.emit(Actions.ServerSendMessage, {
      room: selectedChat.chat.id,
      message,
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

  return { sendMessage, updateMessage, deleteMessageEmit };
}
