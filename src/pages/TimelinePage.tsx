import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import "./TimelinePage.scss";

const TimelinePage = ({ user }: any) => {
  type PostsType = [];
  const [posts, setPosts] = useState<PostsType | undefined>(undefined);
  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const req = await fetch("http://localhost:5000/api/timeline", {
      credentials: "include",
    });
    const postList = await req.json();
    console.log(postList);

    setPosts(postList);
  }

  const updatePosts = () => {
    getPosts();
  };

  return (
    <main>
      <Navbar user={user} />
      <div className="timeline">
        <PostForm updatePosts={updatePosts} user={user} />
        {posts &&
          posts!.map((post: any) => {
            return <Post user={user} post={post} />;
          })}
      </div>
    </main>
  );
};

export default TimelinePage;
