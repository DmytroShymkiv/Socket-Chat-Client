import React, { FC, useContext, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

import { getToken } from "../../utils";
import Actions from "./socketActions";
import { useChats } from "../ChatsContext";
import { useAuth } from "../AuthContext";
import { toastError } from "../../components/Toast/toastActions";
import { IChat, IMessage, Status } from "../../types/chat.types";
import {
  IJoinLeaveResponse,
  IMessageResponse,
  ISocketResponse,
} from "../../types/socket.types";
import { IFile } from "../../types/file.types";

interface IContextValue {
  sendMessage: (message: string, file?: IFile) => void;
  updateMessage: (id: string, text: string) => void;
  deleteMessageEmit: (id: string) => void;
  createRoom: (users: string[], photo?: IFile, name?: string) => void;
  deleteRoom: (room: string) => void;
  startWriting: (room: string) => void;
  stopWriting: (room: string) => void;
  readMessages: (roomId: string) => void;
  disconnect: () => void;
}

const SocketContext = React.createContext<IContextValue>({} as IContextValue);

export function useSocket(): IContextValue {
  return useContext(SocketContext);
}

const SocketProvider: FC = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const {
    selectedChat,
    addMessage,
    setEditedMessage,
    deleteMessage,
    addRoom,
    updateSelectedChat,
    updateChatStatus,
    updateChatUnchecked,
    removeRoom,
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

    socket.current.on(Actions.ClientJoin, (res: IJoinLeaveResponse) => {
      if (res.email && currentUser?.email !== res.email) updateSelectedChat();
    });

    socket.current.on(Actions.ClientLeave, (res: IJoinLeaveResponse) => {
      if (res.email && currentUser?.email !== res.email) updateSelectedChat();
    });

    socket.current.on(Actions.ClientMessage, (message: IMessageResponse) => {
      addMessage(message);
    });

    socket.current.on(Actions.ClientUpdate, (message: IMessage) => {
      setEditedMessage(message);
    });

    socket.current.on(Actions.ClientDeleteMessage, (id: string) => {
      deleteMessage(id);
    });

    socket.current.on(Actions.ClientCreateRoom, (room: IChat) => {
      socket.current?.emit(Actions.ServerJoinRoom, room.id);
      addRoom(room);
    });

    socket.current.on(Actions.ClientDeleteRoom, (room: string) => {
      removeRoom(room);
    });

    socket.current.on(Actions.ClientStartWriting, (res: ISocketResponse) => {
      if (res.user !== currentUser?.id)
        updateChatStatus(res.room, Status.writing);
    });

    socket.current.on(Actions.ClientStopWriting, (res: ISocketResponse) => {
      if (res.user !== currentUser?.id)
        updateChatStatus(res.room, Status.dispatch);
    });

    socket.current.on(Actions.ClientReadMessage, (res: ISocketResponse) => {
      if (res.user === currentUser?.id) updateChatUnchecked(res.room);
    });

    socket.current.on(Actions.ClientError, (err: string) => {
      toastError(err);
    });

    return () => {
      socket.current?.disconnect();
    };

    // eslint-disable-next-line
  }, []);

  const sendMessage = (message: string, file?: IFile) => {
    socket.current?.emit(Actions.ServerSendMessage, {
      room: selectedChat?.chat.id,
      message,
      file,
    });
  };

  const updateMessage = (id: string, text: string) => {
    socket.current?.emit(Actions.ServerUpdateMessage, {
      id,
      text,
    });
  };

  const deleteMessageEmit = (id: string) => {
    socket.current?.emit(Actions.ServerDeleteMessage, {
      id,
    });
  };

  const createRoom = (users: string[], photo?: IFile, name?: string) => {
    socket.current?.emit(Actions.ServerCreateRoom, {
      users,
      photo,
      name,
    });
  };

  const deleteRoom = (room: string) => {
    socket.current?.emit(Actions.ServerDeleteRoom, room);
  };

  const startWriting = (room: string) => {
    socket.current?.emit(Actions.ServerStartWriting, {
      id: room,
    });
  };

  const stopWriting = (room: string) => {
    socket.current?.emit(Actions.ServerStopWriting, {
      id: room,
    });
  };

  const readMessages = (roomId: string) => {
    socket.current?.emit(Actions.ServerReadMessage, {
      id: roomId,
    });
  };

  const disconnect = () => {
    socket.current?.disconnect();
  };

  const value: IContextValue = {
    sendMessage,
    updateMessage,
    deleteMessageEmit,
    createRoom,
    deleteRoom,
    startWriting,
    stopWriting,
    readMessages,
    disconnect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
