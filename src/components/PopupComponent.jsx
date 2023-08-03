import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";
import { useState } from "react";

function PopupComponent({ popupVisible }) {
  const [mediasUrl, setMediasUrl] = useState("");

  const navigate = useNavigate();

  const uploadImage = (files) => {
    return myaxios
      .post("/api/upload", files)
      .then((res) => {
        console.log("res.data ===", res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const handleFilesUpload = (e) => {
    console.log("The files to be uploaded are: ", e.target.files);
    const filesToUpload = e.target.files;
    console.log("here is the first ",filesToUpload[0])
    console.log("here is the second",filesToUpload[1])
    const uploadDatas = new FormData();
    for(let el of filesToUpload){
      uploadDatas.append("mediasUrl", el)
    }

    uploadImage(uploadDatas)
      .then((response) => {
        console.log("response.filesUrl is: ", response.filesUrl);
        // response carries "fileUrl" which we can use to update the state
        setMediasUrl(response.filesUrl);
        navigate(
          `/post/new?mediasUrl=${encodeURIComponent(response.filesUrl)}`
        );
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div className={`add-popup-container ${popupVisible ? "" : "inactive"}`}>
      <div className="add-popup">
        <Link to="/invite">
          <img src="../../images/add.png" alt="add icon" />
          invite your people
        </Link>

        <label>
          <img src="../../images/add.png" alt="add icon" />
          Add pictures/videos
          <input type="file" capture="user" onChange={handleFilesUpload} multiple/>
        </label>

        <Link to="/event/types">
          <img src="../../images/add.png" alt="add icon" />
          Create an event
        </Link>

        <Link to="/project/new">
          <img src="../../images/add.png" alt="add icon" />
          Create a project
        </Link>
      </div>

      <div className="tip"></div>
    </div>
  );
}

export default PopupComponent;
