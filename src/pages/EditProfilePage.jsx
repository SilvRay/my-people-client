import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import NavBar from "../components/NavBar";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";
import { uploadImageProfile } from "../services/file-upload.service";

function EditProfilePage() {
  const { user, refreshUser } = useContext(AuthContext);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const [username, setUsername] = useState(user.username);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const formData = new FormData();

    formData.append("profileImg", e.target.files[0]);

    uploadImageProfile(formData)
      .then((response) => {
        console.log("response is: ", response.imageUrl);
        // response carries "fileUrl" which we can use to update the state
        setProfileImg(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { username, profileImg };

    myaxios
      .put("/api/users", reqBody)
      .then((response) => {
        console.log("response.data ===", response.data);

        refreshUser();
        navigate("/profile?tab=medias");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="profileEdit">
      <main>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label className="profilePicture-container">
            <img
              className="image-icon"
              src="/my-people-client/images/change-pic.png"
              alt="image icon"
            />
            <input
              className="addProfilePicture"
              type="file"
              name="profileImg"
              onChange={(e) => handleFileUpload(e)}
            />
            <img className="profilePicture" src={profileImg} alt="" />
          </label>
          <label>
            Username{" "}
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <button>Edit</button>
        </form>
      </main>

      <NavBar />
    </div>
  );
}

export default EditProfilePage;
