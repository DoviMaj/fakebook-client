import React from "react";
import "./ChatModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

type Props = {
  targetUser: UserType | undefined;
  toggleDisplayModal: () => void;
};

const ChatModal: React.FC<Props> = ({ targetUser, toggleDisplayModal }) => {
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
    </div>
  );
};

export default ChatModal;
