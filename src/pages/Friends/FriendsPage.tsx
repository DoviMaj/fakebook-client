import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { userContext } from "../../GlobalContext";
import "./FriendsPage.scss";

const FriendsPage: React.FC = () => {
  const currentUser = useContext(userContext);
  const [notFriends, setNotFriends] = useState([] as any);

  useEffect(() => {
    const getUsers = async () => {
      const req = await fetch("http://localhost:5000/api/notFriends", {
        credentials: "include",
      });
      setNotFriends(await req.json());
    };
    getUsers();
    document.title = "Fakebook | Friends";
  }, []);
  return (
    <>
      <Navbar />

      <div className="friends">
        <div className="side-bar">
          {notFriends &&
            notFriends.map((friend: any) => <li>{friend.username}</li>)}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
