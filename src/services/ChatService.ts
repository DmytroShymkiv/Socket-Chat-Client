import axios from "axios";

import {
  IChat,
  ISelectedChat,
  IMessage,
  statusType,
} from "../types/chat.types";
import { IError } from "../types/error.type";
import { IMessageResponse } from "../types/socket.types";
import { handleError, getToken } from "../utils";
class ChatService {
  BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  public getChats(start: number, howMany: number): Promise<IChat[] | IError> {
    const url = `${this.BASE_URL}/chat-list/${start}/${howMany}`;
    return this.get(url);
  }

  public getMessages(
    chat: IChat,
    start: number,
    howMany: number
  ): Promise<IMessage[] | IError> {
    if (start < 0) {
      const tmp = howMany + start;
      start = 0;
      howMany = tmp;
    }

    const url = `${this.BASE_URL}/chat-room/${chat.id}/${start}/${howMany}`;
    return this.get(url);
  }

  public getChatNameById = (id: string, chats: IChat[]) => {
    const chat = chats.find((chat) => chat.id === id);
    return chat && chat.name;
  };

  public addMessageToRoom(
    room: ISelectedChat,
    message: IMessageResponse,
    email?: string
  ) {
    const updatedMessages = [...room.messages];
    const isMyMessage = email === message.email;
    updatedMessages.push({
      ...message,
      type: isMyMessage ? "user" : "member",
      status: "send",
    });
    return updatedMessages;
  }

  public getChatMessagesCount(chat: IChat): Promise<number | IError> {
    const url = `${this.BASE_URL}/chat-room/messages-count/${chat.id}`;
    return this.get(url);
  }

  public setEditedMessage(message: IMessage, room: ISelectedChat): IMessage[] {
    const updatedMessages = [...room.messages];
    const index = this.findByIndex(message.id, room.messages);
    if (index < 0) return room.messages;

    updatedMessages[index].text = message.text;
    return updatedMessages;
  }

  public deleteMessageFromRoom(id: string, room: ISelectedChat): IMessage[] {
    const updatedMessages = [...room.messages];
    const index = this.findByIndex(id, room.messages);
    if (index < 0) return [];

    updatedMessages.splice(index, 1);
    return updatedMessages;
  }

  public updateChatStatus(
    id: string,
    chats: IChat[],
    status: statusType
  ): IChat[] {
    const updatedChats = [...chats];
    const index = this.findByIndex(id, chats);
    if (index < 0) return chats;
    updatedChats[index].status = status;
    return updatedChats;
  }

  public updateChatUnchecked(id: string, chats: IChat[]): IChat[] {
    const updatedChats = [...chats];
    const index = this.findByIndex(id, chats);
    if (index < 0) return chats;
    updatedChats[index].noChecked = 0;
    return updatedChats;
  }

  private findByIndex(id: string, arr: any[]): number {
    const oldElement: IChat | IMessage = arr.find((el) => el.id === id);
    if (!oldElement) return -1;
    return arr.findIndex((el) => el.id === id);
  }

  private get(url: string) {
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
