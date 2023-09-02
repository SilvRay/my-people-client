import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";
import { uploadImagePost } from "../services/file-upload.service";
// import { Text, View } from "react-native";
// useRef pour faire référence à la caméra, useState pour afficher différentes choses
// selon s'il y a des autorisations dispo ou s'il y'a une photo qui été prise
// import { useEffect, useRef, useState } from "react";
// import { Camera } from "expo-camera";
// Permettre de partager un fichier
// import { shareAsync } from "expo-sharing";
// import * as MediaLibrary from "expo-media-library";

function PopupComponent({ popupVisible }) {
  //const [mediasUrl, setMediasUrl] = useState([]);
  // let cameraRef = useRef();
  // const [hasCameraPermission, setHasCameraPermission] = useState();
  // Accéder à la galerie ou à la pellicule et enregistrer des photos
  // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  // useEffect(() => {
  //   (async () => {
  // Demander les autorisations de la caméra
  // const cameraPermisssion = await Camera.requestCameraPermissionsAsync();
  // Demander les autorisations de la galerie
  // const mediaLibraryPermisssion =
  //   await MediaLibrary.requestPermissionsAsync();
  // MAJ du state pour avoir l'autorisation de la caméra et l'autorisation de la galerie
  //     setHasCameraPermission((cameraPermisssion.status = "granted"));
  //     setHasMediaLibraryPermission(
  //       (mediaLibraryPermisssion.status = "granted")
  //     );
  //   })();
  // }, []);

  // S'il n'a pas évalué s'il y'a des autorisations
  // if (hasCameraPermission === undefined) {
  // Return le texte qui demande l'autorisation
  // car on ne peut pas encore interagir avec la caméra dc on veut pas la montrer
  //   return <Text>Requesting permissions...</Text>;
  // } else if (!hasCameraPermission) {
  //   return (
  //     <Text>
  //       Permission for camera not granted. Please change this in settings
  //     </Text>
  //   );
  // }

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
          <img src="/my-people-client/images/add.png" alt="add icon" />
          invite your people
        </Link>

        <label>
          <img src="/my-people-client/images/add.png" alt="add icon" />
          Add pictures
          <input
            type="file"
            capture="user"
            onChange={handleFilesUpload}
            multiple
          />
        </label>

        <Link to="/event/types">
          <img src="/my-people-client/images/add.png" alt="add icon" />
          Create an event
        </Link>

        <Link to="/project/new">
          <img src="/my-people-client/images/add.png" alt="add icon" />
          Create a project
        </Link>
      </div>

      {/* <div className="tip"></div> */}
    </div>
  );
}

export default PopupComponent;
