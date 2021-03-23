import React, { useEffect, useRef, useState } from "react";
import "./ChatModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

type Props = {
  targetUser: UserType | undefined;
  toggleDisplayModal: () => void;
  currentUser: UserType | undefined;
  socket: any;
  chat: ChatType;
  setChat: React.Dispatch<React.SetStateAction<ChatType>>;
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
  const bottomRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      setChat([...chat, { msg: input, from: currentUser!._id }]);
      socket.emit("send message", {
        to: targetUser?._id,
        from: currentUser!._id,
        msg: input,
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

      <div className="chat">
        <div className="intro">
          <img src={targetUser?.picture_url} alt="" />
          <strong>{targetUser?.username}</strong>
          <p>You're friends on Fakebook</p>
        </div>{" "}
        {chat.map((msg, index) => {
          return msg.from === currentUser!._id ? (
            <li className="current chat-msg" key={index}>
              {msg.msg}
            </li>
          ) : (
            <li className="chat-msg" key={index}>
              {msg.msg}
            </li>
          );
        })}
        <div ref={bottomRef} className="list-bottom"></div>
      </div>

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
