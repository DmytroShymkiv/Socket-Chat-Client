import { useState, FC, FormEvent, ChangeEvent } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import { IFile } from "../../types/file.types";

interface ICreateRoomBody {
  users: string[];
  name: string;
  photo?: IFile | "";
}

const ChatForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createRoom } = useSocket();
  const { currentUser } = useAuth();
  const [isRoom, setIsRoom] = useState(false);
  const [email, setEmail] = useState("");

  const initialRoomState: ICreateRoomBody = {
    users: [currentUser ? currentUser.email : ""],
    name: "",
    photo: "",
  };
  const [room, setRoom] = useState<ICreateRoomBody>(initialRoomState);

  const getParams = (mode: boolean) => ({
    style: { textDecoration: (mode ? isRoom : !isRoom) ? "underline" : "none" },
    onClick: () => {
      setIsRoom(mode);
      setEmail("");
      setRoom(initialRoomState);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const users = room.users;
    email && users.push(email);
    createRoom(users, room.photo as IFile, room.name);
    onClose();
  };

  const handleAddUser = () => {
    setRoom((prev) => ({ ...prev, users: [...prev.users, email] }));
    setEmail("");
  };

  const handleRemoveUser = (removeEmail: string) => {
    const users = (prev: ICreateRoomBody) =>
      prev.users.filter((email) => email !== removeEmail);
    setRoom((prev) => ({ ...prev, users: users(prev) }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (!file) return;
    setRoom((prev) => ({
      ...prev,
      photo: { originalName: file.name, size: file.size, buffer: file },
    }));
  };

  function UserEmail({ email }: { email: string }) {
    return (
      <li>
        <p>{email}</p>
        <button type="button" onClick={() => handleRemoveUser(email)}>
          X
        </button>
      </li>
    );
  }

  enum InputNames {
    name = "name",
  }

  function Input(name: InputNames) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setRoom((prev) => ({ ...prev, [name]: e.target.value }));
    };

    return (
      <input
        className="chat-modal__form-input"
        placeholder={name}
        value={room[name]}
        onChange={handleChange}
      />
    );
  }

  return (
    <div className="chat-modal">
      <h1 className="chat-modal__title">Create Chat</h1>
      <div>
        <div className="chat-modal__mode">
          <p {...getParams(true)}>Room</p>
          <p>/</p>
          <p {...getParams(false)}>Personal</p>
        </div>
        <form onSubmit={handleSubmit} className="chat-modal__form">
          {isRoom && (
            <>
              <div>
                <label htmlFor="photo">Photo</label>

                <input
                  id="photo"
                  type="file"
                  accept=".jpg, .jpeg, .png, .svg"
                  onChange={handleFileChange}
                />
              </div>
              {Input(InputNames.name)}
              <div className="chat-modal__form-emails">
                <p>Users</p>
                <ul>
                  {room.users.slice(1).map((email) => (
                    <UserEmail key={email} email={email} />
                  ))}
                </ul>
              </div>
            </>
          )}
          <input
            className="chat-modal__form-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isRoom && (
            <button
              className="chat-modal__form-add"
              onClick={handleAddUser}
              type="button"
            >
              Add User
            </button>
          )}
          <button className="chat-modal__form-submit" type="submit">
            Create Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
