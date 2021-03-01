import React, { useState } from "react";
import "./CommentForm.scss";
const CommentForm = ({ user, postId }: any) => {
  const [comment, setComment] = useState("");
  const handleForm = async () => {
    if (comment !== "") {
      console.log(comment);

      const data = { text: comment };
      try {
        const req = await fetch(
          `http://localhost:5000/api/posts/${postId}/comments`,
          {
            method: "post",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        setComment("");
        // updateComments();
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
        src={user.picture_url}
      ></img>
      <input
        placeholder="Write a comment..."
        onKeyPress={(e) => e.key === "Enter" && handleForm()}
        value={comment}
        onChange={(e: any) => {
          e.preventDefault();
          setComment(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default CommentForm;
