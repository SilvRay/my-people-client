import { useEffect, useState } from "react";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";

function AddPostPage() {
  const [legend, setLegend] = useState("");
  const [media, setMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { legend };

    myaxios
      .post("/api/medias", reqBody)
      .then((response) => {
        console.log("The post created ===", response.data);

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

      <img src={media} alt="media of the post" />
      <form onSubmit={handleSubmit}>
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
