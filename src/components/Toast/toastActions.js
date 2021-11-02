import { toast } from "react-toastify";
import FilesService from "../../services/FilesService";
import ChatService from "../../services/ChatService";

export const toastMessage = (message, chats, email) => {
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

export const toastError = (err) => {
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
