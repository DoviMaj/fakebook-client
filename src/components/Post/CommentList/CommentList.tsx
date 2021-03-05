import React, { useEffect, useState } from "react";
import "./CommentList.scss";

const CommentList = ({ comments, commentsVisible }: any) => {
  const [commentsDisplayAmount, setCommentsDisplayAmount] = useState(2);
  const [displayViewMore, setDisplayViewMore] = useState(true);

  useEffect(() => {
    commentsDisplayAmount > comments.length && setDisplayViewMore(false);
  }, [commentsDisplayAmount]);

  return (
    <div
      className="comments-list"
      style={{ display: !commentsVisible ? "none" : "flex" }}
    >
      {comments.map((comment: any, index: any) => {
        if (index <= commentsDisplayAmount) {
          return (
            <div key={comment._id} className="comment-wrapper">
              <img alt="user-pic" src={comment.User.picture_url}></img>
              <div className="comment-text">
                <p className="username">{comment.User.username}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          );
        }
      })}
      {displayViewMore && (
        <p
          className="view-more"
          onClick={() => {
            console.log("hi");

            setCommentsDisplayAmount(commentsDisplayAmount + 10);
            console.log(commentsDisplayAmount);
          }}
        >
          View more comments
        </p>
      )}
    </div>
  );
};

export default CommentList;
