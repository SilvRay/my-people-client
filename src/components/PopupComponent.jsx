import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";
import { useState } from "react";

function PopupComponent({ popupVisible }) {
  const [mediasUrl, setMediasUrl] = useState([]);

  const navigate = useNavigate();

  // route to upload Img on cloudinary. Return an array of img url
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
    console.log("here is the first ", filesToUpload[0]);
    console.log("here is the second", filesToUpload[1]);
    const uploadDatas = new FormData();

    // Vérifier et formater les URLs des images avant de les envoyer à Cloudinary
    for (let el of filesToUpload) {
      // const fileNameParts = el.name.split(".");
      // const fileExtension =
      //   fileNameParts[fileNameParts.length - 1].toLowerCase();

      // // Vérifier si l'extension est déjà présente dans l'URL
      // if (!el.name.endsWith(`.${fileExtension}`)) {
      //   // Si l'extension est manquante, formater correctement l'URL en ajoutant l'extension
      //   el.name = `${el.name}.${fileExtension}`;
      // }

      uploadDatas.append("mediasUrl", el);
    }

    uploadImage(uploadDatas)
      .then((response) => {
        console.log("response.filesUrl is: ", response.filesUrl);
        // response carries "fileUrl" which we can use to update the state
        setMediasUrl(response.filesUrl);
        console.log("mediaUrl after setMediaUrl==",mediasUrl)
      })
       // Création du post avec uniquement les images. On renvoit sur une route Add Post où on rajotuera la légende
      .then(() => {
        console.log("mediaUrl to create post is ==", mediasUrl)
        myaxios.post("/api/medias", mediasUrl)
        .then((response) => {
          console.log("The post created ===", response.data);
        navigate(`/post/new/${response.data._id}`);
        })
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
          <input
            type="file"
            capture="user"
            onChange={handleFilesUpload}
            multiple
          />
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
