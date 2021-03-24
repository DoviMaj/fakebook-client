import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatModal.module.scss";
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
    <div className={styles.chat_modal}>
      <div className={styles.top}>
        <div>
          <img src={targetUser?.picture_url} alt="" />
          <p>{targetUser?.username}</p>
        </div>

        <FontAwesomeIcon icon={faTimesCircle} onClick={toggleDisplayModal} />
      </div>

      <div className={styles.chat}>
        <div className={styles.intro}>
          <img src={targetUser?.picture_url} alt="" />
          <strong>{targetUser?.username}</strong>
          <p>You're friends on Fakebook</p>
        </div>{" "}
        {chat.map((msg, index) => {
          return msg.from === currentUser!._id ? (
            <li className={`${styles.current} ${styles.chat_msg}`} key={index}>
              {msg.msg}
            </li>
          ) : (
            <li className={styles.chat_msg} key={index}>
              {msg.msg}
            </li>
          );
        })}
        <div ref={bottomRef} className={styles.list_bottom}></div>
      </div>

      <form className={styles.chat_form} onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          type="text"
          autoComplete="off"
          name={styles.chat_message}
          placeholder="Aa"
          id=""
        />
      </form>
    </div>
  );
};

export default ChatModal;
