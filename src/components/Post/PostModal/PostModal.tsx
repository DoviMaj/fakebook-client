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
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  errMsg: string;
};
const PostModal: React.FC<Props> = ({
  toggleShowModal,
  currentUser,
  input,
  handleChange,
  handleForm,
  files,
  setFiles,
  errMsg,
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

        {files && (
          <img
            alt="upload"
            className="image"
            src={files && URL.createObjectURL(files[0])}
          />
        )}

        <p>{errMsg}</p>

        <div className="buttons">
          <input
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            name="file"
          ></input>{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleForm(e);
            }}
            className="primary-button"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
