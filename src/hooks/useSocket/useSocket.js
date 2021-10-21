import { useEffect, useRef } from "react";
import io from "socket.io-client";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../../contexts/ChatsContext";

export default function useSocket() {
  const socket = useRef(null);
  const { selectedChat, addMessage } = useChats();

  useEffect(() => {
    const SERVER_URL = "http://localhost:3001";

    socket.current = io(SERVER_URL, {
      auth: {
        token: getToken(),
      },
    });

    socket.current.on(Actions.ClientConnection, (res) => {});

    socket.current.on(Actions.ClientMessage, (message) => {
      selectedChat &&
        selectedChat.messages &&
        addMessage(selectedChat, message);
    });

    return () => {
      socket.current.disconnect();
    };

    // eslint-disable-next-line
  }, [selectedChat]);

  const sendMessage = (message) => {
    socket.current.emit(Actions.ServerSendMessage, {
      room: selectedChat.chat.id,
      message,
    });
  };

  return { sendMessage };
}
