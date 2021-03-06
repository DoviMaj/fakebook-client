import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CommentList.scss";

type Props = {
  comments: Array<{
    User: UserType;
    text: string;
    likes: number;
    date: string;
    _id: string
  }>;
  commentsVisible: boolean
}

const CommentList:React.FC<Props> = ({ comments, commentsVisible }) => {
  const [commentsDisplayAmount, setCommentsDisplayAmount] = useState(2);
  const [displayViewMore, setDisplayViewMore] = useState(true);

  useEffect(() => {
    commentsDisplayAmount > comments.length && setDisplayViewMore(false);
  }, [commentsDisplayAmount, comments]);

  return (
    <div
      className="comments-list"
      style={{ display: !commentsVisible ? "none" : "flex" }}
    >
      {comments.map((comment, index) => {
        if (index <= commentsDisplayAmount) {
          return (
            <div key={comment._id} className="comment-wrapper">
              <img alt="user-pic" src={comment.User.picture_url}></img>
              <div className="comment-text">
                <Link to={`${comment.User._id}`} className="username">
                  {comment.User.username}
                </Link>
                <p>{comment.text}</p>
              </div>
            </div>
          );
        }else{
          return null
        }
      })}
      {displayViewMore && (
        <p
          className="view-more"
          onClick={() => {
            setCommentsDisplayAmount(commentsDisplayAmount + 10);
          }}
        >
          View more comments
        </p>
      )}
    </div>
  );
};

export default CommentList;
