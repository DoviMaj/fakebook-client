import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { userContext } from "../../GlobalContext";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
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
  const [files, setFiles] = useState<FileList | null>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  async function uploadImg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    if (files) {
      console.log(files[0]);
      formData.append("myFile", files[0]);
      try {
        await fetch("http://localhost:5000/api/img", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        setFiles(null);
        inputEl!.current!.value = "null";
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <Navbar />

      {loading ? (
        <Spinner />
      ) : (
        <div className="profile-page">
          <ProfileSection profileUser={profileUser} />
          <form onSubmit={uploadImg}>
            {files && (
              <img alt="upload" src={files && URL.createObjectURL(files[0])} />
            )}
            <input
              type="file"
              ref={inputEl}
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              onClick={(e: any) => (e.target.value = null)}
              name="file"
            ></input>
            <input type="submit"></input>
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
