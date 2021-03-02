import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import "./Post.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import CommentList from "../CommentList/CommentList";

const Post = ({ post, updatePosts }: any) => {
  const now = new Date();
  const postDate = new Date(Date.parse(post.date));
  const diffHrs = differenceInHours(now, postDate);
  const diffMins = differenceInMinutes(now, postDate);
  const fullDate = postDate.toLocaleDateString("en-gb", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const displayDate =
    diffMins < 5
      ? `Just now`
      : diffHrs < 1
      ? `${diffMins}m`
      : diffHrs > 24
      ? fullDate
      : `${diffHrs}h`;
  return (
    <div className="post">
      <div className="post-profile">
        <img src={post.User.picture_url}></img>
        <div>
          <Link to="/profile">{post.User.username}</Link>
          <p>{displayDate}</p>
        </div>
      </div>

      <p>{post.text}</p>
      <CommentForm updatePosts={updatePosts} postId={post._id} />
      <CommentList comments={post.comments} />
    </div>
  );
};

export default Post;
