import React, { useContext, useState } from "react";
import "./PostForm.scss";
import { userContext } from "../../../GlobalContext";
import PostModal from "../PostModal/PostModal";

type Props = {
  updatePosts: () => void;
};

const PostForm: React.FC<Props> = ({ updatePosts }) => {
  const currentUser = useContext(userContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const handleForm = async (e: any) => {
    e.preventDefault();
    if (input !== "" || files) {
      const formData = new FormData();
      if (files && files[0]) {
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
          console.log(formData.get("myFile"), "hi from file");
        } else {
          setErrMsg("file uploaded isnt an image");
        }
      }
      if (input !== "") {
        console.log(input);

        formData.append("text", input);
      }
      console.log(
        input !== "" || files,
        formData.get("myFile"),
        formData.get("text")
      );

      try {
        const req = await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        updatePosts();
        console.log(await req.json());

        if (showModal) toggleShowModal();
        setFiles(null);
        setInput("");
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  function toggleShowModal() {
    setShowModal(!showModal);
  }

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
        <PostModal
          errMsg={errMsg}
          setFiles={setFiles}
          files={files}
          toggleShowModal={toggleShowModal}
          currentUser={currentUser}
          input={input}
          handleChange={handleChange}
          handleForm={handleForm}
        />
      )}
    </div>
  );
};

export default PostForm;
