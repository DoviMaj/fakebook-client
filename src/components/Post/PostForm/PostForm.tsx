import React, { useContext, useState } from "react";
import "./PostForm.scss";
import { userContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

type Props = {
  updatePosts: () => void;
};

const PostForm: React.FC<Props> = ({ updatePosts }) => {
  const currentUser = useContext(userContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleForm = async (e: any) => {
    e.preventDefault();
    if (input !== "") {
      const data = { text: input };
      try {
        await fetch("http://localhost:5000/api/posts", {
          method: "post",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setInput("");
        updatePosts();
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <form className="post-form">
        <div>
          <img alt="user-profile-pic" src={currentUser?.picture_url}></img>
          <textarea
            readOnly
            className="input"
            value={input}
            onClick={toggleShowModal}
            placeholder={`What's on your mind, ${currentUser?.username}?`}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleForm(e);
          }}
          className="link-button"
        >
          Post
        </button>
      </form>
      {showModal && (
        <div className="modal-wrapper">
          <div className="post-modal">
            <div className="header">
              {" "}
              <FontAwesomeIcon
                className="close-icon"
                onClick={() => toggleShowModal()}
                icon={faWindowClose}
              />
              <h2>Create Post</h2>
            </div>

            <textarea
              value={input}
              onChange={(e: any) => {
                handleChange(e);
              }}
              placeholder={`What's on your mind, ${currentUser?.username}?`}
            ></textarea>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleForm(e);
              }}
              className="link-button"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
