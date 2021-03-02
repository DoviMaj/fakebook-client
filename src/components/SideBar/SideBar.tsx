import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../GlobalContext";
import "./SideBar.scss";

const SideBar = () => {
  const currentUser = useContext(userContext);
  return (
    <div className="side-bar">
      <Link to="/profile">
        <img alt="user-profile-pic" src={currentUser.picture_url}></img>
        <p>{currentUser.username}</p>
      </Link>
      <Link to="/friends">
        <img alt="" src={""}></img>
        <p>Friends</p>
      </Link>
    </div>
  );
};

export default SideBar;
