import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";
import { uploadImagePost } from "../services/file-upload.service";

function PopupComponent({ popupVisible }) {
  //const [mediasUrl, setMediasUrl] = useState([]);

  const navigate = useNavigate();

  //console.log("mediaUrl at the beginning=",mediasUrl)

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
    <div className={`add-popup-container ${popupVisible ? "" : "inactive"}`}>
      <div className="add-popup">
        <Link to="/invite">
          <img src="../../public/images/add.png" alt="add icon" />
          invite your people
        </Link>

        <label>
          <img src="../../public/images/add.png" alt="add icon" />
          Add pictures/videos
          <input
            type="file"
            capture="user"
            onChange={handleFilesUpload}
            multiple
          />
        </label>

        <Link to="/event/types">
          <img src="../../public/images/add.png" alt="add icon" />
          Create an event
        </Link>

        <Link to="/project/new">
          <img src="../../public/images/add.png" alt="add icon" />
          Create a project
        </Link>
      </div>

      <div className="tip"></div>
    </div>
  );
}

export default PopupComponent;
