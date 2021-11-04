import { FC, useEffect, useState } from "react";

import Chat from "../../components/Chat/ChatContent/Chat";
import ChatList from "../../components/Chat/ChatList/ChatList";
import Loader from "../../components/Loader/Loader";
import Toast from "../../components/Toast/ToastContainer";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useChats } from "../../contexts/ChatsContext";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import { useUI } from "../../contexts/UIContext";
import { IError } from "../../types/error.type";

const ChatPage: FC = () => {
  const { getAllChats } = useChats();
  const { responsive } = useUI();
  const { isListHidden, isChatHidden, hideChat } = responsive;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { disconnect } = useSocket();

  const fetchChats = async () => {
    const response = await getAllChats();
    const { errors } = response as IError;
    errors && setError(errors);
    setLoading(false);
  };
  useEffect(() => {
    fetchChats();

    return () => {
      disconnect();      
      hideChat();
    };
    // eslint-disable-next-line
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div style={{ display: "flex" }}>
      <Toast />
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
};

export default ChatPage;
