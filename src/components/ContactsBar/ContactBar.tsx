import React, { useContext, useEffect, useState } from "react";
import "./ContactBar.scss";
import { userContext } from "../../GlobalContext";
import ChatModal from "../ChatModal/ChatModal";
import { socket } from "../../socket";

const ContactBar = () => {
  const currentUser = useContext(userContext);
  const [targetUser, setTargetUser] = useState<UserType | undefined>(undefined);
  const [displayModal, setDisplayModal] = useState(false);
  const [chat, setChat] = useState<string[]>([]);

  const chooseFriend = (friend: UserType) => {
    setTargetUser(friend);
    !displayModal && toggleDisplayModal();
  };

  useEffect(() => {
    setChat([]);
  }, [targetUser]);

  const toggleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };

  useEffect(() => {
    socket.on("recieve message", (msg: any) => {
      msg.from === targetUser!._id && setChat([...chat, msg.input]);
      console.log(msg, chat);
    });

    return () => {
      socket.off("recieve message");
    };
  });
  return (
    <div className="contact-bar">
      <h3>Contacts</h3>
      {currentUser ? (
        currentUser.friends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => chooseFriend(friend)}
            className="friend"
          >
            <img src={friend.picture_url} alt="pic-url" />
            <p>{friend.username}</p>
          </div>
        ))
      ) : (
        <div className="friend">No Contacts</div>
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
