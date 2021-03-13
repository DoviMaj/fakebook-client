import React, { useRef, useState } from "react";
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
        <div>
          {files && (
            <img
              alt="upload"
              className="image"
              src={files && URL.createObjectURL(files[0])}
            />
          )}
          <input
            className="link-button"
            style={{ width: "initial" }}
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            name="file"
          ></input>
          <p>{errMsg}</p>
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
      </div>
    </div>
  );
};

export default PostModal;
