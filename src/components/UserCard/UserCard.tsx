import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";

type Props = {
  user: UserType;
  sent?: boolean;
  recieved?: boolean;
  friend?: boolean;
  getUsers: () => void;
  updateCurrentUser: () => void;
};

const UserCard: React.FC<Props> = ({
  user,
  sent,
  recieved,
  friend,
  getUsers,
  updateCurrentUser,
}) => {
  const addFriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND}/api/friendRequest/${user._id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "post",
        }
      );
      updateCurrentUser();
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmFriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND}/api/acceptRequest/${user._id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "post",
        }
      );
      updateCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };

  const unfriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}/api/unfriend/${user._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "post",
      });
      getUsers();
      updateCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };

  const unrequest = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND}/api/unrequest/${user._id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "post",
        }
      );
      getUsers();
      updateCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link to={user._id} className="user-card">
      <img src={user.picture_url} alt="user-pic" />
      <div className="right">
        <strong className="username">{user.username}</strong>
        <div className="buttons">
          {sent ? (
            <>
              <button onClick={unrequest}>Remove</button>
            </>
          ) : recieved ? (
            <>
              {" "}
              <button onClick={confirmFriend} className="primary">
                Confirm
              </button>
              <button>Remove</button>
            </>
          ) : friend ? (
            <>
              {" "}
              <button onClick={unfriend}>Remove Friend</button>
            </>
          ) : (
            <>
              {" "}
              <button onClick={addFriend} className="primary">
                Add Friend
              </button>
              <button>Remove</button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
