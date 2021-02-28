import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import "./Post.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";

const Post = ({ post, user }: any) => {
  const now = new Date();
  const postDate = Date.parse(post.date);
  const diffHrs = differenceInHours(now, postDate);
  const diffMins = differenceInMinutes(now, postDate);
  const fullDate = new Date(post.date).toLocaleDateString("en-gb", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const displayDate =
    diffHrs < 1 ? `${diffMins}m` : diffHrs > 24 ? fullDate : `${diffHrs}hr  `;
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
      <CommentForm user={user} />
    </div>
  );
};

export default Post;
