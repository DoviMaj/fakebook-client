import React, { useContext, useRef, useState } from "react";
import "./CommentForm.scss";
import { userContext } from "../../../GlobalContext";

const CommentForm = ({ postId, updatePosts, inputEl }: any) => {
  const currentUser = useContext(userContext);
  const [comment, setComment] = useState("");

  const handleForm = async (e: any) => {
    e.preventDefault();
    if (comment !== "") {
      console.log(comment);

      const data = { text: comment };
      try {
        await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
          method: "post",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setComment("");
        updatePosts();
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <form className="comment-form">
      <img
        className="comment-img"
        alt="profile pic"
        src={currentUser.picture_url}
      ></img>
      <input
        ref={inputEl}
        placeholder="Write a comment..."
        onKeyPress={(e) => e.key === "Enter" && handleForm(e)}
        value={comment}
        onChange={(e: any) => {
          setComment(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default CommentForm;
