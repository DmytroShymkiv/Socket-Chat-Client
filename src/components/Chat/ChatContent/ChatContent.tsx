import { useState, useEffect, useRef, FC } from "react";

import { useChats } from "../../../contexts/ChatsContext";
import { useSocket } from "../../../contexts/SocketContext/SocketContext";
import { IError } from "../../../types/error.type";
import Loader from "../../Loader/Loader";
import MessageFromUser from "../../Message/MessageFromUser";
import MessageToUser from "../../Message/MessageToUser";

const ChatContent: FC = () => {
  const {
    selectedChat,
    getChatRoom,
    getChatMessagesCount,
    setLoading,
    updateChatUnchecked,
  } = useChats();
  const { readMessages } = useSocket();
  const messages = selectedChat && selectedChat.messages;

  const [start, setStart] = useState<number>(0);
  const howMany = 10;
  const [count, setCount] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: Event) => {
    const { scrollTop, scrollHeight } = e.target as HTMLDivElement;
    const { clientHeight } = listRef.current as HTMLDivElement;
    const isOnTop = scrollHeight - clientHeight + scrollTop < 50;
    const isScrolled = clientHeight < scrollHeight;

    if (
      isOnTop &&
      isScrolled &&
      messages &&
      messages.length < count &&
      start >= 0
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line
  }, [count, start]);

  const fetchInitialMessages = async () => {
    if (!selectedChat) return;
    let fetchedCount = await getChatMessagesCount(selectedChat.chat);
    const { errors } = fetchedCount as IError;
    if (errors) return;
    fetchedCount = fetchedCount as number;
    await getChatRoom(selectedChat.chat, fetchedCount - howMany, howMany);
    setStart(fetchedCount - howMany);
    setCount(fetchedCount);
  };
  useEffect(() => {
    setLoading(true);
    fetchInitialMessages();

    return () => {
      if (!selectedChat) return;
      readMessages(selectedChat.chat.id);
      updateChatUnchecked(selectedChat.chat.id);
    };

    // eslint-disable-next-line
  }, [selectedChat?.chat.id]);

  const fetchNextMessages = async () => {
    if (!selectedChat) return;
    await getChatRoom(selectedChat.chat, start - howMany, howMany);
    setStart((prev) => prev - howMany);
    setFetching(false);
  };
  useEffect(() => {
    fetching && fetchNextMessages();

    // eslint-disable-next-line
  }, [fetching]);

  const messagesView = messages
    ? messages.map((message) =>
        message.type === "user" ? (
          <MessageFromUser key={message.id} message={message} />
        ) : (
          <MessageToUser key={message.id} message={message} />
        )
      )
    : [];

  return (
    <div ref={listRef} className="chatroom__content">
      <span id="messagesEnd" />
      {messages ? messagesView.reverse() : <Loader />}
    </div>
  );
};

export default ChatContent;
