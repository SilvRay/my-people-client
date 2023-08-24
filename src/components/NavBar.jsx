import { Link, useNavigate } from "react-router-dom";
import PopupComponent from "./PopupComponent";
import { useContext, useState } from "react";
import { uploadImagePost } from "../services/file-upload.service";
import myaxios from "../myaxios";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const [popupVisible, setPopupVisible] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate;

  const handlePopupClick = () => {
    // MAJ du state pour rendre la popup visible
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    // MAJ du state pour rendre la popup invisible
    setPopupVisible(false);
  };

  const handleFilesUpload = (e) => {
    console.log("The files to be uploaded are: ", e.target.files);
    const filesToUpload = e.target.files;
    console.log("here is the first ", filesToUpload[0]);
    console.log("here is the second", filesToUpload[1]);
    const uploadDatas = new FormData();

    for (let el of filesToUpload) {
      uploadDatas.append("mediasUrl", el);
    }

    uploadImagePost(uploadDatas)
      .then((response) => {
        console.log("response.filesUrl is: ", response.filesUrl);
        // response carries "fileUrl" which we can use to update the state

        return myaxios
          .post("/api/medias", response.filesUrl)
          .then((response) => {
            console.log("The post created ===", response.data);
            navigate(`/post/new/${response.data._id}`);
          });
        //console.log("mediaUrl after setMediasUrl==",mediasUrl)
      })
      // CrÃ©ation du post avec uniquement les images. On renvoie sur une route Add Post oÃ¹ on rajotuera la lÃ©gende

      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  return (
    <>
      <div className="navbar">
        <img className="logo" src="/my-people-client/images/logo.png" />
        <section>
          <Link to="/home?tab=medias">
            <img
              src="/my-people-client/images/home-icon.png"
              alt="homepage icon"
            />
            <span>Home</span>
          </Link>
          <Link to="/notifications">
            <img
              src="/my-people-client/images/notif.png"
              alt="notification icon"
            />
            <span>Notifications</span>
          </Link>
          <Link to="/search">
            <img src="/my-people-client/images/search.png" alt="search icon" />
            <span>Search</span>
          </Link>
          <Link to="/profile?tab=medias">
            <img
              src="/my-people-client/images/profile.png"
              alt="profile icon"
            />
            <span>Profile</span>
          </Link>
          <Link className="create" to="/invite">
            <img src="/my-people-client/images/add.png" alt="add icon" />
            <span>invite your people</span>
          </Link>

          <label className="create">
            <img src="/my-people-client/images/add.png" alt="add icon" />
            <span>Add pictures/videos</span>
            <input
              type="file"
              capture="user"
              onChange={handleFilesUpload}
              multiple
            />
          </label>

          <Link className="create" to="/event/types">
            <img src="/my-people-client/images/add.png" alt="add icon" />
            <span>Create an event</span>
          </Link>

          <Link className="create" to="/project/new">
            <img src="/my-people-client/images/add.png" alt="add icon" />
            <span>Create a project</span>
          </Link>

          <div className="logout-container" onClick={logoutUser}>
            <img
              src="/my-people-client/images/logout.png"
              alt="logout icon"
              className="logout"
            />
            <span>logout</span>
          </div>

          <button
            className="popup-btn"
            onClick={popupVisible ? handleClosePopup : handlePopupClick}
          >
            <img src="/my-people-client/images/add.png" />
          </button>
        </section>
      </div>
      <PopupComponent popupVisible={popupVisible} />
    </>
  );
}

export default NavBar;
