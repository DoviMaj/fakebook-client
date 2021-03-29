import React, { useContext, useState } from "react";
import "./CommentForm.scss";
import { userContext } from "../../../GlobalContext";

type Props = {
  postId: string;
  updatePosts: () => void;
  inputEl: any;
};

const CommentForm: React.FC<Props> = ({ postId, updatePosts, inputEl }) => {
  const currentUser = useContext(userContext);
  const [comment, setComment] = useState("");

  const handleForm = async (e: any) => {
    e.preventDefault();
    if (comment !== "") {
      const data = { text: comment };
      try {
        await fetch(
          `${process.env.REACT_APP_BACKEND}/api/posts/${postId}/comments`,
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
        src={currentUser?.picture_url}
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
