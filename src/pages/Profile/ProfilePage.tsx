import { request } from "node:https";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { userContext } from "../../GlobalContext";
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
  const [profileUser, setProfileUser] = useState<UserType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const currentUser = useContext(userContext);
  type ID = { id: string };
  let { id } = useParams<ID>();

  useEffect(() => {
    document.title = `Fakebook | ${currentUser?.username}`;
    currentUser!._id === id ? setProfileUser(currentUser) : fetchUser();
    getPosts();
  }, [id]);

  async function fetchUser() {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const request = await fetch(`http://localhost:5000/api/profile/${id}`, {
      credentials: "include",
    });
    const res = await request.json();
    setProfileUser(res.user);
    document.title = `Fakebook | ${res.user?.username}`;
    setLoading(false);
  }
  async function getPosts() {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const req = await fetch(`http://localhost:5000/api/profile/${id}`, {
      credentials: "include",
    });
    const res = await req.json();
    setPosts(res.posts);
    setLoading(false);
  }

  const imgUpload = () => {};
  return (
    <>
      <Navbar />

      {loading ? (
        <Spinner />
      ) : (
        <div className="profile-page">
          <div className="profile-section">
            <img
              className="cover-pic"
              alt="cover-pic"
              src="https://source.unsplash.com/1600x900"
            ></img>
            <div className="pic-and-name">
              <img
                className="user-pic"
                alt="user-pic"
                src={profileUser?.picture_url}
              ></img>
              <strong>{profileUser?.username}</strong>
            </div>
          </div>{" "}
          <form encType="multipart/form-data">
            <input type="file" name="file"></input>
            <input onClick={imgUpload} type="button">
              Submit
            </input>
          </form>
          <div className="posts">
            {posts &&
              posts.map((post) => {
                return (
                  <Post key={post._id} updatePosts={getPosts} post={post} />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
