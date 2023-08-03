import { useState } from "react";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service"

function AddPostPage() {
  const [legend, setLegend] = useState("");
  const [mediasUrl, setMediasUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    // const files = e.target.files.FileList;
    // console.log(files)
    const uploadDatas = new FormData();
    // files.forEach((file, i) => {
    //   uploadDatas.append(`file-${i}`, file, file.name);
    // });
    // mediasUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadDatas.append("mediasUrl", e.target.files[0]);
    uploadImage(uploadDatas)
      .then(response => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setMediasUrl(response.filesUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { legend, mediasUrl };

    myaxios
      .post("/api/medias", reqBody)
      .then((response) => {
        console.log("The post created ===", response.data);
        setMediasUrl("");
        setLegend("");

        navigate("/home?tab=medias");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddPostPage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* <img src={media} alt="media of the post" /> */}
      <form onSubmit={handleSubmit} >
        <label> <img src="/images/change-pic.png" alt="addPhoto"/> Add pictures and/or videos
            <input type="file" onChange={(e) => handleFilesUpload(e)} multiple/>
        </label>
        <textarea
          name="legend"
          value={legend}
          onChange={(e) => setLegend(e.target.value)}
        />
        <button>Post</button>
      </form>
    </div>
  );
}

export default AddPostPage;
