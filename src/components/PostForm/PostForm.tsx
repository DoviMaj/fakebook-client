import React, { useContext, useState } from "react";
import "./PostForm.scss";
import { userContext } from "../../GlobalContext";

const PostForm = ({ updatePosts }: any) => {
  const currentUser = useContext(userContext);
  const [input, setInput] = useState("");
  const handleForm = async (e: any) => {
    e.preventDefault();
    if (input !== "") {
      const data = { text: input };
      try {
        await fetch("http://localhost:5000/api/posts", {
          method: "post",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setInput("");
        updatePosts();
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  return (
    <form className="post-form">
      <div>
        <img alt="user-profile-pic" src={currentUser.picture_url}></img>
        <textarea
          value={input}
          onChange={(e: any) => {
            handleChange(e);
          }}
          placeholder={`What's on your mind, ${currentUser.username}?`}
        ></textarea>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleForm(e);
        }}
        className="link-button"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
