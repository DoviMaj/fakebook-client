import React, { useState } from "react";
import "./PostForm.scss";

const PostForm = ({ user }: any) => {
  const [input, setInput] = useState("");
  const handleForm = async (e: any) => {
    const data = { text: input };
    try {
      const req = await fetch("http://localhost:5000/api/posts", {
        method: "post",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  return (
    <>
      <form className="post-form">
        <div>
          <img alt="user-profile-pic" src={user.picture_url}></img>
          <input
            value={input}
            onKeyPress={(e: any) => e.key === "Enter" && handleForm(e)}
            onChange={(e: any) => {
              // e.key !== "Enter" ? handleForm(e) : null;
              handleChange(e);
            }}
            placeholder={`What's on your mind, ${user.username}?`}
          ></input>
        </div>

        <button type="button" onClick={handleForm} className="link-button">
          Post
        </button>
      </form>
    </>
  );
};

export default PostForm;
