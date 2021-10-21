import React, { useState, useEffect, useRef } from "react";

import { useChats } from "../../../contexts/ChatsContext";
import MessageFromUser from "../../Message/MessageFromUser";
import MessageToUser from "../../Message/MessageToUser";

export default function ChatContent() {
  const { selectedChat, getChatRoom, getChatMessagesCount, setLoading } =
    useChats();
  const messages = selectedChat.messages;

  const [start, setStart] = useState(0);
  const howMany = 10;
  const [count, setCount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const listRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight } = e.target;
    if (
      scrollTop < 100 &&
      listRef.current.clientHeight < scrollHeight &&
      messages.length < count &&
      start >= 0
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (start === count - howMany)
      listRef.current.scrollTop = listRef.current.scrollHeight;

    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line
  }, [count, start]);

  const fetchInitialMessages = async () => {
    const fetchedCount = await getChatMessagesCount(selectedChat.chat);
    await getChatRoom(selectedChat.chat, fetchedCount - howMany, howMany);
    setStart(fetchedCount - howMany);
    setCount(fetchedCount);
  };
  useEffect(() => {
    setLoading(true);
    fetchInitialMessages();

    // eslint-disable-next-line
  }, [selectedChat.chat.id]);

  const fetchNextMessages = async () => {
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
      {messagesView}
    </div>
  );
}
