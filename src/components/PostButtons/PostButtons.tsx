import React, { useState } from "react";
import "./PostButtons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-regular-svg-icons";

const PostButtons = ({ post, updatePosts }: any) => {
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const handleLike = async () => {
    console.log("hi");
    if (hasUserLiked) {
      try {
        await fetch(`http://localhost:5000/api/posts/${post._id}/likes`, {
          credentials: "include",
          method: "put",
        });
        updatePosts();
        setHasUserLiked(false);
      } catch (err) {
        console.log(err);
      }
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/posts/${post._id}/likes`, {
        credentials: "include",
        method: "post",
      });
      updatePosts();
      setHasUserLiked(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="post-likes">
      <div className="line"></div>
      <div className="buttons-wrapper">
        <div className="button like-button" onClick={handleLike}>
          <FontAwesomeIcon
            className={`icon ${hasUserLiked && "liked"}`}
            icon={faThumbsUp}
          />
          <p>Like</p>
        </div>
        <div className="button">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Comment</p>
        </div>
        <div className="button">
          <FontAwesomeIcon className="icon" icon={faShareSquare} />
          <p>Share</p>
        </div>
      </div>

      <div className="line"></div>
    </div>
  );
};

export default PostButtons;
