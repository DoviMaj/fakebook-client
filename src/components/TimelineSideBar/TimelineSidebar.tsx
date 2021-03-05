import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../GlobalContext";
import "./TimelineSidebar.scss";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  const currentUser = useContext(userContext);
  return (
    <div className="side-bar">
      <Link to="/profile">
        <img alt="user-profile-pic" src={currentUser?.picture_url}></img>
        <p>{currentUser?.username}</p>
      </Link>
      <Link to="/friends">
        <FontAwesomeIcon style={{ width: "30px" }} icon={faUserFriends} />{" "}
        <p>Friends</p>
      </Link>
    </div>
  );
};

export default SideBar;
