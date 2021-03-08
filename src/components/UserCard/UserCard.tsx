import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";

type Props = {
  user: UserType;
  sent?: boolean;
  recieved?: boolean;
  friend?: boolean;
  getUsers: () => void;
  fetchUser: () => void;
};

const UserCard: React.FC<Props> = ({
  user,
  sent,
  recieved,
  friend,
  getUsers,
  fetchUser,
}) => {
  const addFriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/friendRequest/${user._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "post",
      });
      fetchUser();
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmFriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/acceptRequest/${user._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "post",
      });
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  const unfriend = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/unfriend/${user._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "post",
      });
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  const unrequest = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/unrequest/${user._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "post",
      });
      getUsers();
      fetchUser();
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
