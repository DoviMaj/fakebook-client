import React, { useState } from "react";
import "./ChatModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

type Props = {
  targetUser: UserType | undefined;
  toggleDisplayModal: () => void;
  currentUser: UserType | undefined;
  socket: any;
  chat: string[];
  setChat: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChatModal: React.FC<Props> = ({
  targetUser,
  toggleDisplayModal,
  currentUser,
  socket,
  chat,
  setChat,
}) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      setChat([...chat, input]);
      socket.emit("send message", {
        to: targetUser?._id,
        from: currentUser!._id,
        input,
      });
      setInput("");
    }
  };

  return (
    <div className="chat-modal">
      <div className="top">
        <div>
          <img src={targetUser?.picture_url} alt="" />
          <p>{targetUser?.username}</p>
        </div>

        <FontAwesomeIcon icon={faTimesCircle} onClick={toggleDisplayModal} />
      </div>

      <div className="intro">
        <img src={targetUser?.picture_url} alt="" />
        <strong>{targetUser?.username}</strong>
        <p>You're friends on Fakebook</p>
      </div>
      {chat.map((msg, index) => {
        return <li key={index}>{msg}</li>;
      })}
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          type="text"
          autoComplete="off"
          name="chat-message"
          placeholder="Aa"
          id=""
        />
      </form>
    </div>
  );
};

export default ChatModal;
