import React, { useState } from "react";
import "./PostButtons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-regular-svg-icons";

type Props = {
  post: PostType;
  updatePosts: () => void;
  focusOnCommentInput: () => void;
};

const PostButtons: React.FC<Props> = ({
  post,
  updatePosts,
  focusOnCommentInput,
}) => {
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const handleLike = async () => {
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
        <div className="button" onClick={handleLike}>
          <FontAwesomeIcon
            className={`icon ${hasUserLiked && "liked"}`}
            icon={faThumbsUp}
          />
          <p>Like</p>
        </div>
        <div className="button" onClick={focusOnCommentInput}>
          <FontAwesomeIcon className="icon" icon={faComment} />
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
