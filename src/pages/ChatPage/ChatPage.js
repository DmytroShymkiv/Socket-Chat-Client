import React, { useEffect, useState } from "react";

import Chat from "../../components/Chat/ChatContent/Chat";
import ChatList from "../../components/Chat/ChatList/ChatList";
import Loader from "../../components/Loader/Loader";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useChats } from "../../contexts/ChatsContext";
import { useUI } from "../../contexts/UIContext";

export default function ChatPage() {
  const { getChats } = useChats();
  const { responsive } = useUI();
  const { isListHidden, isChatHidden } = responsive;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChats = async () => {
    const response = await getChats(0, 0);
    response.errors && setError(response.errors);
    setLoading(false);
  };
  useEffect(() => {
    fetchChats();

    // eslint-disable-next-line
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div style={{ display: "flex" }}>
      <TopMenu />
      <div className="chat-page">
        {loading ? (
          <Loader />
        ) : (
          <div className="chat-page__content">
            {!isListHidden && (
              <div className="chat-page__list">
                <ChatList />
              </div>
            )}
            {!isChatHidden && (
              <div className="chat-page__chat">
                <Chat />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}