import React, { useContext, useState } from "react";
import "./ContactBar.scss";
import { userContext } from "../../GlobalContext";
import ChatModal from "../ChatModal/ChatModal";

const ContactBar = () => {
  const currentUser = useContext(userContext);
  const [targetUser, setTargetUser] = useState<UserType | undefined>(undefined);
  const [displayModal, setDisplayModal] = useState(false);
  const showModal = (friend: UserType) => {
    setTargetUser(friend);
    toggleDisplayModal();
  };

  const toggleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };
  return (
    <div className="contact-bar">
      <h3>Contacts</h3>
      {currentUser?.friends.map((friend) => (
        <div onClick={() => showModal(friend)} className="friend">
          <img src={friend.picture_url} alt="" />
          <p>{friend.username}</p>
        </div>
      ))}
      {displayModal && (
        <ChatModal
          targetUser={targetUser}
          toggleDisplayModal={toggleDisplayModal}
        />
      )}
    </div>
  );
};

export default ContactBar;
