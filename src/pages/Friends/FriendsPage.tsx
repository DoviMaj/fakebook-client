import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Spinner from "../../components/Spinner/Spinner";
import UserCard from "../../components/UserCard/UserCard";
import { userContext } from "../../GlobalContext";
import "./FriendsPage.scss";

type Props = {
  updateCurrentUser: () => void;
};

const FriendsPage: React.FC<Props> = ({ updateCurrentUser }) => {
  const currentUser = useContext(userContext);
  const [notFriends, setNotFriends] = useState([] as Array<UserType>);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const req = await fetch("http://localhost:5000/api/notFriends", {
      credentials: "include",
    });
    setNotFriends(await req.json());
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
    document.title = "Fakebook | Friends";
  }, []);
  return (
    <>
      <Navbar />

      <div className="friends">
        <div className="friends-side-bar">
          <div className="fixed-title">
            <h1>Friends</h1>
          </div>

          <div className="users">
            {loading && <Spinner />}

            {currentUser!.friends.length > 0 && (
              <div>
                <strong className="section">Friends</strong>
                {currentUser!.friends.map((friend) => (
                  <UserCard
                    updateCurrentUser={updateCurrentUser}
                    getUsers={getUsers}
                    friend
                    key={friend._id}
                    user={friend}
                  />
                ))}
              </div>
            )}

            {currentUser!.friendsRequestsRecieved.length > 0 && (
              <div>
                <strong className="section">Recieved Requests</strong>
                {currentUser!.friendsRequestsRecieved.map((friend) => (
                  <UserCard
                    updateCurrentUser={updateCurrentUser}
                    getUsers={getUsers}
                    recieved
                    key={friend._id}
                    user={friend}
                  />
                ))}
              </div>
            )}

            {currentUser!.friendsRequestsSent.length > 0 && (
              <div>
                <strong className="section">Sent Requests</strong>
                {currentUser!.friendsRequestsSent.map((friend) => (
                  <UserCard
                    updateCurrentUser={updateCurrentUser}
                    getUsers={getUsers}
                    sent
                    key={friend._id}
                    user={friend}
                  />
                ))}
              </div>
            )}

            {notFriends.length > 0 && (
              <div>
                <strong className="section">People You May Know</strong>
                {notFriends.map((friend) => (
                  <UserCard
                    updateCurrentUser={updateCurrentUser}
                    getUsers={getUsers}
                    key={friend._id}
                    user={friend}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
