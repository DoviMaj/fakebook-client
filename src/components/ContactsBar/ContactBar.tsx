import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../GlobalContext";
import ChatModal from "../ChatModal/ChatModal";
import styles from "./ContactBar.module.scss";
import { socket } from "../../socket";

const ContactBar = () => {
  const currentUser = useContext(userContext);
  const [targetUser, setTargetUser] = useState<UserType>();
  const [displayModal, setDisplayModal] = useState(false);
  const [chat, setChat] = useState<ChatType>([]);

  const chooseFriend = (friend: UserType) => {
    setTargetUser(friend);
    !displayModal && toggleDisplayModal();
  };

  useEffect(() => {
    // get chat by id
    setChat([]);
    targetUser && socket.emit("get chat", currentUser?._id, targetUser!._id);
  }, [targetUser]);

  const toggleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };

  useEffect(() => {
    const getCurrentUserId = async () => {
      const req = await fetch(`${process.env.REACT_APP_BACKEND}/api/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const user = await req.json();
      return user._id;
    };
    socket.on("connect", async () => {
      // get all chats
      const currentUserId = await getCurrentUserId();
      socket.emit("logged-in", currentUserId);
    });

    // listen to server recieve message event
    socket.on("recieve message", (msg: { from: string; msg: string }) => {
      targetUser && msg.from === targetUser!._id && setChat([...chat, msg]);
    });
    // listen to server send chat event
    socket.on("send chat", (chat) => {
      setChat(chat);
    });
    return () => {
      socket.off("recieve message");
      socket.off("send chat");
      socket.off("connected");
    };
  });
  return (
    <div className={styles.contact_bar}>
      <h3>Contacts</h3>
      {currentUser ? (
        currentUser.friends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => chooseFriend(friend)}
            className={styles.friend}
          >
            <img src={friend.picture_url} alt="pic-url" />
            <p>{friend.username}</p>
          </div>
        ))
      ) : (
        <div className={styles.friend}>No Contacts</div>
      )}
      {displayModal && (
        <ChatModal
          setChat={setChat}
          chat={chat}
          socket={socket}
          currentUser={currentUser}
          targetUser={targetUser}
          toggleDisplayModal={toggleDisplayModal}
        />
      )}
    </div>
  );
};

export default ContactBar;
