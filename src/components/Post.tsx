import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post = ({ post }: any) => {
  const now = new Date();
  const nowHrs = now.getHours();
  const nowMinutes = now.getMinutes();
  const postHour = new Date(post.date).getHours();
  const postMin = new Date(post.date).getMinutes();
  const hourDiff = nowHrs - postHour;
  const minutesDiff = postMin - nowMinutes;
  const fullDate = new Date(post.date).toLocaleDateString("en-gb", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const displayDate =
    hourDiff <= 1
      ? `${minutesDiff}m`
      : hourDiff > 24
      ? fullDate
      : `${hourDiff}hr`;
  return (
    <div className="post">
      <div className="post-profile">
        <img src={post.User.picture_url}></img>
        <div className="">
          <Link to="/profile">{post.User.username}</Link>
          <p>{displayDate}</p>
        </div>
      </div>

      <p>{post.text}</p>
    </div>
  );
};

export default Post;
