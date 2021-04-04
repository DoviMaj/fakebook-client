import React, { useRef, useState } from "react";
import "./EditPicModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

const EditPicModal = ({ toggleShowModal }: { toggleShowModal: () => void }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState("");
  async function uploadImg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    if (files) {
      const Extension = files[0].name
        .substring(files[0].name.lastIndexOf(".") + 1)
        .toLowerCase();

      //The file uploaded is an image
      if (
        Extension === "gif" ||
        Extension === "png" ||
        Extension === "bmp" ||
        Extension === "jpeg" ||
        Extension === "jpg"
      ) {
        formData.append("myFile", files[0]);
        try {
          setErrMsg("");
          await fetch(`${process.env.REACT_APP_BACKEND}/api/updateProfileImg`, {
            method: "POST",
            body: formData,
            credentials: "include",
          });
          toggleShowModal();
        } catch (err) {
          console.log(err);
        }
      } else {
        setErrMsg("file uploaded isnt an image");
      }
    }
  }
  return (
    <div className="edit-modal-wrapper">
      <div className="edit-modal">
        <FontAwesomeIcon
          className="close-icon"
          onClick={() => toggleShowModal()}
          icon={faWindowClose}
        />
        <h1>Upload new profile Picture</h1>
        <form onSubmit={uploadImg}>
          {files && (
            <img
              alt="upload"
              className="image"
              src={files && URL.createObjectURL(files[0])}
            />
          )}
          <input
            className="primary-button"
            style={{ width: "initial" }}
            type="file"
            ref={inputEl}
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            // onClick={(e: any) => (e.target.value = null)}
            name="file"
          ></input>
          <input
            className="primary-button"
            style={{ width: "initial" }}
            type="submit"
          ></input>
          <p>{errMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default EditPicModal;
