import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../GlobalContext";
import styles from "./TimelineSidebar.module.scss";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar: React.FC = () => {
  const currentUser = useContext(userContext);
  return (
    <div className={styles.side_bar}>
      <Link className={styles.profile_link} to={`/${currentUser?._id}`}>
        <img alt="user-profile-pic" src={currentUser?.picture_url}></img>
        <p className={styles.link_text}>{currentUser?.username}</p>
      </Link>
      <Link className={styles.friends_link} to="/friends">
        <FontAwesomeIcon style={{ width: "30px" }} icon={faUserFriends} />{" "}
        <p className={styles.link_text}>Friends</p>
      </Link>
    </div>
  );
};

export default SideBar;
