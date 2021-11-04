import { toast } from "react-toastify";
import FilesService from "../../services/FilesService";
import ChatService from "../../services/ChatService";
import { IChat } from "../../types/chat.types";
import { IMessageResponse } from "../../types/socket.types";

export const toastMessage = (
  message: IMessageResponse,
  chats: IChat[],
  email?: string
) => {
  const name = ChatService.getChatNameById(message.room, chats);
  const file = FilesService.formatName(message.file && message.file.name);
  const text = message.text + " " + file;
  const shouldShow = email !== message.email;

  shouldShow &&
    toast(name + " : " + text, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

export const toastError = (err: string) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
