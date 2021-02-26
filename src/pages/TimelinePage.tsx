import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const TimelinePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const req = await fetch("http://localhost:5000/api/timeline", {
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
      });
      const posts = await req.json();
      setPosts(posts);
      console.log(posts);
    }
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <p>{posts}</p>
      {posts &&
        posts.map((post: []) => {
          return <li>{post}</li>;
        })}
    </>
  );
};

export default TimelinePage;
