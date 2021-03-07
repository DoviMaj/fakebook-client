import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post/Post";
import PostForm from "../../components/Post/PostForm/PostForm";
import SideBar from "../../components/TimelineSideBar/TimelineSidebar";
import "./TimelinePage.scss";
import Spinner from "../../components/Spinner/Spinner";

type PostsType = Array<PostType>;

const TimelinePage: React.FC = () => {
  const [posts, setPosts] = useState<PostsType | undefined>(undefined);
  useEffect(() => {
    document.title = "Fakebook";
    getPosts();
  }, []);

  async function getPosts() {
    const req = await fetch("http://localhost:5000/api/timeline", {
      credentials: "include",
    });
    const postList = await req.json();
    setPosts(postList);
  }

  const updatePosts = () => {
    getPosts();
  };

  return (
    <>
      <Navbar />

      <div className="timeline">
        <SideBar />
        <div className="posts">
          <PostForm updatePosts={updatePosts} />
          {!posts ? (
            <Spinner />
          ) : (
            <>
              {posts.map((post) => {
                return (
                  <Post key={post._id} updatePosts={updatePosts} post={post} />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
