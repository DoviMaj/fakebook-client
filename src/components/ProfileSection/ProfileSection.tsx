import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import EditPicModal from "../EditPicModal/EditPicModal";
import { userContext } from "../../GlobalContext";
import "./ProfileSection.scss";

const ProfileSection = ({
  profileUser,
}: {
  profileUser: UserType | undefined;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const currentUser = useContext(userContext);
  useEffect(() => {
    profileUser && setIsCurrentUser(currentUser!._id === profileUser!._id);
  }, [profileUser, currentUser]);

  const toggleShowModal = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <div className="profile-section">
      <img
        className="cover-pic"
        alt="cover-pic"
        src="https://images.unsplash.com/photo-1470364798856-7a74180378dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80"
      ></img>
      <div className="pic-and-name">
        {isCurrentUser && (
          <FontAwesomeIcon
            className="edit-icon"
            onClick={() => toggleShowModal()}
            icon={faEdit}
          />
        )}
        {profileUser?.picture_url && (
          <img
            className="user-pic"
            alt="user-pic"
            src={profileUser!.picture_url}
          ></img>
        )}
        
        <strong>{profileUser?.username}</strong>
        {showEditModal && <EditPicModal toggleShowModal={toggleShowModal} />}
      </div>
    </div>
  );
};

export default ProfileSection;
