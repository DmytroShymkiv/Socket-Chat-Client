interface IChat {
  id: string;
  isRoom: boolean;
  time: number;
  status: string;
  photo: string;
  online: boolean;
  noChecked: number;
  message: string;
  file: string | undefined;
  name: string;
  exitDate: number | false;
}

export default IChat;
