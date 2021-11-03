import { IChat, Status } from "../types/chat.types";

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const handleError = async (callback: Function) => {
  try {
    return await callback();
  } catch (error) {
    let errors = error.response.data;
    if (errors.join) errors = errors.join("\n");
    else if (errors.message) errors = errors.message;
    return { errors };
  }
};

export const getTimeAgo = (time: number): string => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const currentDate: number = Date.now();
  const sentDate: number = new Date(time).getTime();

  const dateDiff = new Date(currentDate - sentDate);

  const timesAgo = [
    { key: "year", value: dateDiff.getFullYear() - 1970 },
    { key: "month", value: dateDiff.getMonth() },
    { key: "day", value: dateDiff.getTime() / DAY },
    { key: "hour", value: dateDiff.getTime() / HOUR },
    { key: "minute", value: dateDiff.getTime() / MINUTE },
    { key: "second", value: dateDiff.getTime() / SECOND },
  ];

  for (const timeAgo of timesAgo) {
    let { key, value } = timeAgo;
    value = Math.floor(value);
    if (value > 0) return `${value} ${formatEnding(value, key)} ago`;
  }
  return "now";
};

const formatEnding = (value: number, time: string): string => {
  if (value > 1) time = time + "s";
  return time;
};

export const sortChats = (chats: IChat[]): IChat[] => {
  if (!chats) return [];
  return chats.sort((a, b) => b.time - a.time);
};

export const getChatStatus = (chat: IChat): string => {
  if (chat.status !== Status.dispatch) return chat.status;
  if (chat.online) return "online";
  if (chat.exitDate) return `last seen ${getTimeAgo(chat.exitDate)}`;

  return "offline";
};
