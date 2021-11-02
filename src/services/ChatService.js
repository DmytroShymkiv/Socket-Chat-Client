import axios from "axios";

import { handleError, getToken } from "../utils";

class ChatService {
  BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  chatListEquals(chats, chatsToCheck) {
    return chats.length === chatsToCheck.length;
  }

  selectedChatEquals(chat, chatToCheck) {
    return !(
      !chat ||
      !chatToCheck ||
      !chatToCheck.messages ||
      chat.chat.id !== chatToCheck.chat.id ||
      chat.messages.length !== chatToCheck.messages.length
    );
  }

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

  getChatNameById = (id, chats) => {
    const chat = chats.find((chat) => chat.id === id);
    return chat && chat.name;
  };

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
    const index = this._findByIndex(message.id, room.messages);
    if (index < 0) return room.messages;

    updatedMessages[index].text = message.text;
    return updatedMessages;
  }

  deleteMessageFromRoom(id, room) {
    const updatedMessages = [...room.messages];
    const index = this._findByIndex(id, room.messages);
    if (index < 0) return [];

    updatedMessages.splice(index, 1);
    return updatedMessages;
  }

  updateChatStatus(id, chats, status) {
    const updatedChats = [...chats];
    const index = this._findByIndex(id, chats);
    if (index < 0) return chats;
    updatedChats[index].status = status;
    return updatedChats;
  }

  updateChatUnchecked(id, chats) {
    const updatedChats = [...chats];
    const index = this._findByIndex(id, chats);
    if (index < 0) return chats;
    updatedChats[index].noChecked = 0;
    return updatedChats;
  }

  _findByIndex(id, arr) {
    const oldElement = arr.find((el) => el.id === id);
    if (!oldElement) return -1;
    return arr.findIndex((el) => el.id === id);
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
