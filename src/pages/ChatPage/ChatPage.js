import React, { useEffect, useState } from "react";

import Chat from "../../components/Chat/ChatContent/Chat";
import ChatList from "../../components/Chat/ChatList/ChatList";
import Loader from "../../components/Loader/Loader";
import { useChats } from "../../contexts/ChatsContext";

export default function ChatPage() {
  const { getChats } = useChats();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ message: "" });
  
  const fetchChats = async () => {
    const start = 0;
    const howMany = 10;
    const response = await getChats(start, howMany);
    response.errors && setError(response.errors);
    setLoading(false);
  };
  useEffect(() => {
    fetchChats();

    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  if (error && error.message) return <h1>{error.message}</h1>;

  return (
    <div className="chat-page">
      <h1>Chat Page</h1>
      <div className="chat-page__content">
        <div className="chat-page__list">
          <ChatList />
        </div>
        <div className="chat-page__chat">
          <Chat />
        </div>
      </div>
    </div>
  );
}
