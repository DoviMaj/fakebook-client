import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import "./Post.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import CommentList from "../CommentList/CommentList";
import PostButtons from "../PostButtons/PostButtons";
import LikesAndCommentsCount from "../LikesAndCommentsCount/LikesAndCommentsCount";
import { userContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

type Props = {
  post: PostType;
  updatePosts: () => void;
};

const Post: React.FC<Props> = ({ post, updatePosts }) => {
  const [isHover, setIsHover] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(true);
  const currentUser = useContext(userContext);
  const isOwnUserPost = post.User._id === currentUser?._id;

  const inputEl = useRef<HTMLInputElement>(null);
  const focusOnCommentInput = () => {
    inputEl?.current?.focus();
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

  const toggleCommentsVisible = () => {
    setCommentsVisible((commentsVisible) => !commentsVisible);
  };
  return (
    <div
      className="post"
      onMouseLeave={() => setIsHover(false)}
      onMouseOver={() => setIsHover(true)}
    >
      {isOwnUserPost && isHover && (
        <FontAwesomeIcon
          className="delete"
          icon={faTrashAlt}
          onClick={handleDeletePost}
        ></FontAwesomeIcon>
      )}

      <div className="post-profile">
        <img
          className="user-profile-pic"
          alt="user-profile-pic"
          src={post.User.picture_url}
        ></img>
        <div>
          <Link to={`/${post.User._id}`}>{post.User.username}</Link>
          <p>{displayDate}</p>
        </div>
      </div>

      <p>{post.text}</p>
      {post.image_url && (
        <img alt="post-img" className="post-image" src={post.image_url}></img>
      )}

      <LikesAndCommentsCount
        toggleCommentsVisible={toggleCommentsVisible}
        post={post}
      />
      <PostButtons
        focusOnCommentInput={focusOnCommentInput}
        updatePosts={updatePosts}
        post={post}
      />
      <CommentList commentsVisible={commentsVisible} comments={post.comments} />
      <CommentForm
        inputEl={inputEl}
        updatePosts={updatePosts}
        postId={post._id}
      />
    </div>
  );
};

export default Post;
