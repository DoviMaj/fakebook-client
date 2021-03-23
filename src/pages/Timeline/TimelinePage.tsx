import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Post from "../../components/Post/Post/Post";
import PostForm from "../../components/Post/PostForm/PostForm";
import TimelineSideBar from "../../components/TimelineSideBar/TimelineSidebar";
import styles from "./TimelinePage.module.scss";
import Spinner from "../../components/Spinner/Spinner";
import ContactBar from "../../components/ContactsBar/ContactBar";

type PostsType = Array<PostType>;

const TimelinePage: React.FC = () => {
  const [posts, setPosts] = useState<PostsType>();
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

      <div className={styles.timeline}>
        <TimelineSideBar />
        <div className={styles.posts}>
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
        <ContactBar />
      </div>
    </>
  );
};

export default TimelinePage;
