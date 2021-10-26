import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext/SocketContext";

export default function ChatForm({ onClose }) {
  const { createRoom } = useSocket();
  const { currentUser } = useAuth();
  const [isRoom, setIsRoom] = useState(false);
  const [email, setEmail] = useState("");

  const [room, setRoom] = useState({
    users: [currentUser.email],
  });

  const getParams = (mode) => ({
    style: { textDecoration: (mode ? isRoom : !isRoom) ? "underline" : "none" },
    onClick: () => {
      setIsRoom(mode);
      setEmail("");
      setRoom({
        users: [currentUser.email],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = room.users;
    email && users.push(email);
    createRoom(users, room.photo, room.name);
    onClose();
  };

  const handleAddUser = () => {
    setRoom((prev) => ({ ...prev, users: [...prev.users, email] }));
    setEmail("");
  };

  const handleRemoveUser = (removeEmail) => {
    const users = (prev) => prev.users.filter((email) => email !== removeEmail);
    setRoom((prev) => ({ ...prev, users: users(prev) }));
  };

  function UserEmail({ email }) {
    return (
      <li>
        <p>{email}</p>
        <button type="button" onClick={() => handleRemoveUser(email)}>
          X
        </button>
      </li>
    );
  }

  function Input(name) {
    const handleChange = (e) => {
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
              {Input("photo")}
              {Input("name")}
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
}
