import { useState, FC } from "react";

import more from "../../../assets/icons/chevron-down.png";
import plus from "../../../assets/icons/plus.png";
import ChatForm from "../../ChatForm/ChatForm";
import Modal from "../../Modal/Modal";

const ChatListHeader: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => setIsOpen(false);
  const CreateChatModal = () => (
    <Modal
      content={<ChatForm onClose={onClose} />}
      isOpen={isOpen}
      onClose={onClose}
    />
  );

  return (
    <>
      <CreateChatModal />
      <div className="chat-list__header">
        <div>
          <h1 className="chat-list__header-title">Chats</h1>
          <div className="chat-list__header-filter">
            <p>Recent chats</p>
            <div>
              <img src={more} alt="more" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="chat-list__header-create"
        >
          <img src={plus} alt="plus" />
          <p>Create New Chat</p>
        </button>
      </div>
    </>
  );
};

export default ChatListHeader;
