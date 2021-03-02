import React from "react";
import "./PostLikes.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-regular-svg-icons";

const PostLikes = ({ post }: any) => {
  return (
    <div className="post-likes">
      <div className="line"></div>
      <div className="buttons-wrapper">
        <div className="button">
          <FontAwesomeIcon className="icon" icon={faThumbsUp} />
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

export default PostLikes;
