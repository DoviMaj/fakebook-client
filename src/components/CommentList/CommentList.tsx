import React, { useState } from "react";
import "./CommentList.scss";

const CommentList = ({ comments }: any) => {
  return (
    <div className="comments-list">
      {comments.map((comment: any) => {
        return (
          <div key={comment._id} className="comment-wrapper">
            <img src={comment.User.picture_url}></img>
            <div className="comment-text">
              <p className="username">{comment.User.username}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;