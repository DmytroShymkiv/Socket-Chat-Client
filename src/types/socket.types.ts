import { IMessageFile } from "./file.types";

export interface IJoinLeaveResponse {
  room: string;
  email: string;
}

export interface ISocketResponse {
  room: string;
  user: string;
}

export interface IMessageResponse {
  date: number;
  email: string;
  file: IMessageFile;
  id: string;
  photo: string;
  status: string;
  text: string;
  room: string;
}
