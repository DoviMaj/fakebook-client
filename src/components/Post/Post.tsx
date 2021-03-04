import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import "./Post.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import CommentList from "../CommentList/CommentList";
import PostButtons from "../PostButtons/PostButtons";
import LikesAndCommentsCount from "../LikesAndCommentsCount/LikesAndCommentsCount";
import { userContext } from "../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const Post = ({ post, updatePosts }: any) => {
  const [isHover, setIsHover] = useState(false);
  const currentUser = useContext(userContext);
  const isOwnUserPost = post.User._id === currentUser._id;

  const inputEl: any = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  const now = new Date();
  const postDate = new Date(post.date);
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

  const handleDeletePost = async () => {
    console.log("hi");

    try {
      await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        credentials: "include",
        method: "delete",
      });
      updatePosts();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="post"
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
    >
      {isOwnUserPost && isHover && (
        <FontAwesomeIcon
          className="delete"
          icon={faTrashAlt}
          onClick={handleDeletePost}
        ></FontAwesomeIcon>
      )}

      <div className="post-profile">
        <img alt="user-profile-pic" src={post.User.picture_url}></img>
        <div>
          <Link to="/profile">{post.User.username}</Link>
          <p>{displayDate}</p>
        </div>
      </div>
      <p>{post.text}</p>

      <LikesAndCommentsCount post={post} />
      <PostButtons
        onButtonClick={onButtonClick}
        inputEl={inputEl}
        updatePosts={updatePosts}
        post={post}
      />
      <CommentForm
        inputEl={inputEl}
        updatePosts={updatePosts}
        postId={post._id}
      />
      <CommentList comments={post.comments} />
    </div>
  );
};

export default Post;
