import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import NavBar from "../components/NavBar";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";
import uploadImage from "../services/file-upload.service";

function EditProfilePage() {
  const { user } = useContext(AuthContext);
  const [profileImg, setProfileImg] = useState("");
  const [username, setUsername] = useState(user.username);
  const [birthday, setBirthday] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const formData = new FormData();

    formData.append("profileImg", e.target.files[0]);

    uploadImage(formData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setProfileImg(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { username, birthday, profileImg };

    myaxios
      .put("/api/users", reqBody)
      .then((response) => {
        console.log("response.data ===", response.data);

        navigate("/profile?tab=medias");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="profileEdit">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label className="profilePicture-container">
          <img
            className="image-icon"
            src="../../images/change-pic.png"
            alt="image icon"
          />
          <input
            className="addProfilePicture"
            type="file"
            name="profileImg"
            onChange={(e) => handleFileUpload(e)}
          />
          <img
            className="profilePicture"
            src={profileImg}
            alt="profile picture"
          />
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

        <label>
          Birthday{" "}
          <input
            className="birthday"
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>

        <button>Edit</button>
      </form>

      <NavBar />
    </div>
  );
}

export default EditProfilePage;
