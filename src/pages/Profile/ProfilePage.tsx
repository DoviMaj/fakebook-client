import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { userContext } from "../../GlobalContext";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [profileUser, setProfileUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);

  const currentUser = useContext(userContext);
  type ID = { id: string };
  let { id } = useParams<ID>();

  const getPosts = useCallback(async () => {
    const req = await fetch(
      `${process.env.REACT_APP_BACKEND}/api/profile/${id}`,
      {
        credentials: "include",
      }
    );
    const res = await req.json();
    setPosts(res.posts);
  }, [id]);

  useEffect(() => {
    document.title = `Fakebook | ${currentUser?.username}`;
    currentUser!._id === id ? setProfileUser(currentUser) : fetchUser();
    getPosts();
    async function fetchUser() {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const request = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/profile/${id}`,
        {
          credentials: "include",
        }
      );
      const res = await request.json();
      setProfileUser(res.user);
      document.title = `Fakebook | ${res.user?.username}`;
      setLoading(false);
    }
  }, [id, currentUser, getPosts]);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <ProfileSection profileUser={profileUser} />
        {loading && <Spinner />}{" "}
        <div className="posts">
          {posts &&
            posts.map((post) => {
              return <Post key={post._id} updatePosts={getPosts} post={post} />;
            })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
