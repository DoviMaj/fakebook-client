import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import "./PostModal.scss";

type Props = {
  toggleShowModal: () => void;
  currentUser: UserType | undefined;
  input: string;
  handleChange: (e: any) => void;
  handleForm: (e: any) => void;
};
const PostModal: React.FC<Props> = ({
  toggleShowModal,
  currentUser,
  input,
  handleChange,
  handleForm,
}) => {
  return (
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
  );
};

export default PostModal;
