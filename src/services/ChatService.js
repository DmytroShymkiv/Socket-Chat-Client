import axios from "axios";

import { handleError, getToken } from "../utils";

class ChatService {
  BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  getChats(start, howMany) {
    const url = `${this.BASE_URL}/chat-list/${start}/${howMany}`;
    return this._get(url);
  }

  getMessages(chat, start, howMany) {
    if (start < 0) {
      const tmp = howMany + start;
      start = 0;
      howMany = tmp;
    }

    const url = `${this.BASE_URL}/chat-room/${chat.id}/${start}/${howMany}`;
    return this._get(url);
  }

  updateLastMessage(chats, message) {
    const updatedChats = [...chats];
    const chatIndex = updatedChats.findIndex((el) => el.id === message.room);
    updatedChats[chatIndex].message = message.text;
    updatedChats[chatIndex].time = message.date;
    return updatedChats;
  }

  addMessageToRoom(room, message, email) {
    const updatedMessages = [...room.messages];
    const isMyMessage = email === message.email;
    updatedMessages.push({
      ...message,
      type: isMyMessage ? "user" : "member",
      status: "send",
    });
    return updatedMessages;
  }

  getChatMessagesCount(chat) {
    const url = `${this.BASE_URL}/chat-room/messages-count/${chat.id}`;
    return this._get(url);
  }

  setEditedMessage(message, room) {
    const updatedMessages = [...room.messages];
    const index = this._findMessageIndex(message.id, room.messages);
    if(!index) return false;
   
    updatedMessages[index].text = message.text;
    return updatedMessages;
  }

  deleteMessageFromRoom(id, room) {
    const updatedMessages = [...room.messages];
    const index = this._findMessageIndex(id, room.messages);
    if(!index) return false;

    updatedMessages.splice(index, 1);
    return updatedMessages;
  }

  _findMessageIndex(id, messages) {
    const oldMessage = messages.find((el) => el.id === id);
    if (!oldMessage) return false;
    return messages.findIndex((el) => el.id === id);
  }

  _get(url) {
    return handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      return response.data;
    });
  }
}

export default new ChatService();
