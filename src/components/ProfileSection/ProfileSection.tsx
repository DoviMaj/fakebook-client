import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import EditPicModal from "../EditPicModal/EditPicModal";
import { userContext } from "../../GlobalContext";

const ProfileSection = ({
  profileUser,
}: {
  profileUser: UserType | undefined;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const currentUser = useContext(userContext);
  useEffect(() => {
    profileUser &&
      currentUser!._id === profileUser!._id &&
      setIsCurrentUser(true);
  }, [profileUser]);

  const toggleShowModal = () => {
    setShowEditModal(!showEditModal);
  };
  return (
    <div className="profile-section">
      <img
        className="cover-pic"
        alt="cover-pic"
        src="https://source.unsplash.com/1600x900"
      ></img>
      <div className="pic-and-name">
        {isCurrentUser && (
          <FontAwesomeIcon
            className="edit-icon"
            onClick={() => toggleShowModal()}
            icon={faEdit}
          />
        )}
        <img
          className="user-pic"
          alt="user-pic"
          src={profileUser?.picture_url}
        ></img>
        <strong>{profileUser?.username}</strong>
        {showEditModal && <EditPicModal toggleShowModal={toggleShowModal} />}
      </div>
    </div>
  );
};

export default ProfileSection;
